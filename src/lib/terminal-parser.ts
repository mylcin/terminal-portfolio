import { AVAILABLE_COMMANDS } from '@/config/commands';
import type { CommandName, CommandOutput } from '@/types/terminal';
import { executeCommand } from './commands';

export interface ParsedCommand {
  command: CommandName | string;
  args: string[];
  flags: Record<string, string | boolean>;
}

interface Token {
  optional?: boolean;
  required?: boolean;
  param?: string;
  greedy?: boolean;
  choices?: Array<Choice>;
}

interface Choice {
  value?: string;
  keyword?: string;
  param?: string;
}

export function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() || '';
  const remaining = parts.slice(1);

  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < remaining.length; i++) {
    const part = remaining[i];
    if (part.startsWith('--')) {
      const flagName = part.slice(2);
      const nextPart = remaining[i + 1];
      if (nextPart && !nextPart.startsWith('-')) {
        flags[flagName] = nextPart;
        i++;
      } else {
        flags[flagName] = true;
      }
    } else if (part.startsWith('-')) {
      const flagName = part.slice(1);
      flags[flagName] = true;
    } else {
      args.push(part);
    }
  }

  return { command, args, flags };
}

export async function processCommand(input: string): Promise<CommandOutput> {
  if (!input.trim()) {
    return {
      type: 'info',
      content: '',
      timestamp: new Date(),
    };
  }

  const parsed = parseCommand(input);

  try {
    const result = await executeCommand(parsed);
    return {
      type: 'success',
      content: result,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      type: 'error',
      content:
        error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date(),
    };
  }
}

export function validateUsage(
  command: string,
  args: string[],
  flags: Record<string, string | boolean> = {}
): { valid: boolean; message?: string } {
  const spec = getCommandSpec(command);

  if (!spec) {
    return { valid: true };
  }

  const usage = spec.usage;
  const tokens = parseUsageTokens(usage);
  const validFlags = extractValidFlags(usage);

  if (Object.keys(flags).length > 0 && validFlags.length > 0) {
    const invalidFlags = Object.keys(flags).filter(
      f => !validFlags.includes(f)
    );

    if (invalidFlags.length > 0) {
      return {
        valid: false,
        message: `Unknown flag(s): --${invalidFlags.join(', --')}\nUsage: ${spec.usage}`,
      };
    }
  }

  if (tokens.length === 0) {
    if (args.length > 0) {
      return {
        valid: false,
        message: `Invalid usage.\nUsage: ${spec.usage}`,
      };
    }
    return { valid: true };
  }

  let argIndex = 0;

  for (const token of tokens) {
    const arg = args[argIndex];

    if (token.required && token.greedy) {
      if (!arg) {
        return {
          valid: false,
          message: `Invalid usage.\nUsage: ${spec.usage}`,
        };
      }

      argIndex = args.length;
      break;
    }

    if (token.optional) {
      if (!arg) {
        continue;
      }

      if (token.choices) {
        let matched = false;

        for (const choice of token.choices) {
          if (choice.keyword) {
            if (arg === choice.keyword) {
              argIndex++;
              const nextArg = args[argIndex];
              if (!nextArg) {
                return {
                  valid: false,
                  message: `Invalid usage.\nUsage: ${spec.usage}`,
                };
              }
              argIndex++;
              matched = true;
              break;
            }
          } else if (choice.value) {
            if (arg === choice.value) {
              argIndex++;
              matched = true;
              break;
            }
          }
        }

        if (!matched) {
          return {
            valid: false,
            message: `Invalid argument: "${arg}"\nUsage: ${spec.usage}`,
          };
        }
      } else if (token.param) {
        argIndex++;
      }
    } else if (token.required) {
      if (!arg) {
        return {
          valid: false,
          message: `Invalid usage.\nUsage: ${spec.usage}`,
        };
      }
      argIndex++;
    }
  }

  if (argIndex < args.length) {
    return {
      valid: false,
      message: `Invalid usage.\nUsage: ${spec.usage}`,
    };
  }

  return { valid: true };
}

function parseUsageTokens(usage: string) {
  const tokens: Array<Token> = [];

  const withoutCommand = usage.replace(/^\w+\s*/, '');

  let i = 0;
  while (i < withoutCommand.length) {
    const char = withoutCommand[i];

    if (char === '[') {
      let depth = 1;
      let j = i + 1;
      while (j < withoutCommand.length && depth > 0) {
        if (withoutCommand[j] === '[') depth++;
        if (withoutCommand[j] === ']') depth--;
        j++;
      }

      const content = withoutCommand.slice(i + 1, j - 1);

      if (content.startsWith('--')) {
        i = j;
        continue;
      }

      if (content.includes('|')) {
        const choices: Array<Choice> = [];
        const parts = content.split('|');

        for (const part of parts) {
          const trimmed = part.trim();
          const match = trimmed.match(/^(\w+)\s+<(.+?)>$/);
          if (match) {
            choices.push({
              keyword: match[1],
              param: match[2],
            });
          } else {
            choices.push({ value: trimmed });
          }
        }

        tokens.push({ optional: true, choices });
      } else if (content.includes('<')) {
        let param = content.replace(/[<>]/g, '');
        let greedy = false;
        if (param.endsWith('...')) {
          greedy = true;
          param = param.slice(0, -3);
        }
        tokens.push({ optional: true, param, greedy });
      } else {
        tokens.push({ optional: true, choices: [{ value: content }] });
      }

      i = j;
    } else if (char === '<') {
      const closeIdx = withoutCommand.indexOf('>', i);
      let param = withoutCommand.slice(i + 1, closeIdx);

      let greedy = false;
      if (param.endsWith('...')) {
        greedy = true;
        param = param.slice(0, -3);
      }

      tokens.push({ required: true, param, greedy });
      i = closeIdx + 1;
    } else {
      i++;
    }
  }

  return tokens;
}

function extractValidFlags(usage: string): string[] {
  const flags: string[] = [];

  const flagPattern = /\[--(\w+(?:-\w+)*)\]/g;
  let match;

  while ((match = flagPattern.exec(usage)) !== null) {
    const flagName = match[1];
    flags.push(flagName);

    if (!flagName.includes('-') && flagName.length > 1) {
      flags.push(flagName[0]);
    }
  }

  return flags;
}

function getCommandSpec(command: string) {
  return AVAILABLE_COMMANDS.find(
    c =>
      c.name.toLowerCase() === command.toLowerCase() ||
      c.aliases?.some(a => a.toLowerCase() === command.toLowerCase())
  );
}
