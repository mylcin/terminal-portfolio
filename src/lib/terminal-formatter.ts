export const LINE_TYPES = {
  TITLE: '@@TITLE@@',
  SUBTITLE: '@@SUBTITLE@@',
  SUCCESS: '@@SUCCESS@@',
  ERROR: '@@ERROR@@',
  WARNING: '@@WARNING@@',
  DIM: '@@DIM@@',
  HIGHLIGHT: '@@HIGHLIGHT@@',
} as const;

export class TerminalFormatter {
  static title(text: string): string {
    return `${LINE_TYPES.TITLE}${text}`;
  }

  static subtitle(text: string): string {
    return `${LINE_TYPES.SUBTITLE}${text}`;
  }

  static success(text: string): string {
    return `${LINE_TYPES.SUCCESS}${text}`;
  }

  static error(text: string): string {
    return `${LINE_TYPES.ERROR}${text}`;
  }

  static warning(text: string): string {
    return `${LINE_TYPES.WARNING}${text}`;
  }

  static dim(text: string): string {
    return `${LINE_TYPES.DIM}${text}`;
  }

  static highlight(text: string): string {
    return `${LINE_TYPES.HIGHLIGHT}${text}`;
  }

  static formatList(items: string[], bullet: string = '•'): string {
    return items.map(item => `  ${bullet} ${item}`).join('\n');
  }

  static sectionHeader(text: string): string {
    const line = '━'.repeat(45);
    return `${LINE_TYPES.TITLE}${line}\n${LINE_TYPES.TITLE}  ${text}\n${LINE_TYPES.TITLE}${line}`;
  }

  static box(content: string, title?: string): string {
    const stripMarkers = (str: string): string => {
      return str.replace(/@@[A-Z]+@@/g, '');
    };

    const lines = content.split('\n');
    const strippedLines = lines.map(stripMarkers);
    const maxLength = Math.max(
      ...strippedLines.map(l => l.length),
      title ? stripMarkers(title).length : 0
    );
    const innerWidth = maxLength + 2;

    const top = `╭${'─'.repeat(innerWidth)}╮`;
    const bottom = `╰${'─'.repeat(innerWidth)}╯`;

    const result: string[] = [top];

    if (title) {
      const strippedTitle = stripMarkers(title);
      const titlePadding = innerWidth - strippedTitle.length - 1;
      result.push(
        `│ ${LINE_TYPES.TITLE}${strippedTitle}${' '.repeat(Math.max(0, titlePadding))}│`
      );
      result.push(`├${'─'.repeat(innerWidth)}┤`);
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const strippedLine = strippedLines[i];
      const padding = innerWidth - strippedLine.length - 1;
      result.push(`│ ${line}${' '.repeat(Math.max(0, padding))}│`);
    }

    result.push(bottom);
    return result.join('\n');
  }

  static keyValue(key: string, value: string): string {
    return `${LINE_TYPES.HIGHLIGHT}${key}${' '.repeat(Math.max(1, 12 - key.length))}${LINE_TYPES.SUBTITLE}${value}`;
  }

  static divider(length: number = 45): string {
    return `${LINE_TYPES.DIM}${'─'.repeat(length)}`;
  }

  static link(url: string): string {
    return url;
  }
}
