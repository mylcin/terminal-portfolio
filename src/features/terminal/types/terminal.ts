export type CommandName =
  | 'help'
  | 'ascii'
  | 'about'
  | 'blog'
  | 'certifications'
  | 'contact'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'resume'
  | 'social'
  | 'mode'
  | 'theme'
  | 'clear';

export interface CommandOutput {
  type: 'success' | 'error' | 'info' | 'warning';
  content: string | React.ReactNode;
  timestamp: Date;
}

export interface CommandHistory {
  id: string;
  command: string;
  output: CommandOutput;
  timestamp: Date;
}

export interface Command {
  name: CommandName | string;
  description: string;
  usage: string;
  aliases?: string[];
}

export interface TerminalState {
  history: CommandHistory[];
  currentInput: string;
  isProcessing: boolean;
  mode: 'terminal' | 'classic';
}
