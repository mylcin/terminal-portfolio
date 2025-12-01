import { aboutConfig } from '@/config/about';
import { asciiConfig } from '@/config/ascii';
import { certificationsConfig } from '@/config/certifications';
import { AVAILABLE_COMMANDS } from '@/config/commands';
import { contactConfig } from '@/config/contact';
import { educationConfig } from '@/config/education';
import { experienceConfig } from '@/config/experience';
import { projectsConfig } from '@/config/projects';
import { skillsConfig } from '@/config/skills';
import { TerminalFormatter as fmt } from './terminal-formatter';
import { ParsedCommand, validateUsage } from './terminal-parser';

const ALIASES: Record<string, string> = {
  h: 'help',
  '?': 'help',
  whoami: 'about',
  exp: 'experience',
  work: 'experience',
  proj: 'projects',
  tech: 'skills',
  edu: 'education',
  certs: 'certifications',
  certificates: 'certifications',
  email: 'contact',
  cv: 'resume',
  cls: 'clear',
  print: 'echo',
};

export async function executeCommand(parsed: ParsedCommand): Promise<string> {
  const { command, args, flags } = parsed;
  const cmd = ALIASES[command] || command;

  const validation = validateUsage(cmd, args);
  if (!validation.valid) {
    return validation.message || 'Invalid usage.';
  }

  switch (cmd) {
    case 'help':
      return handleHelp();
    case 'about':
      return handleAbout();
    case 'experience':
      return handleExperience(flags);
    case 'projects':
      return handleProjects(args, flags);
    case 'skills':
      return handleSkills();
    case 'education':
      return handleEducation();
    case 'certifications':
      return handleCertifications();
    case 'contact':
      return handleContact();
    case 'social':
      return handleSocial();
    case 'resume':
      return handleResume(flags);
    case 'blog':
      return handleBlog(args);
    case 'clear':
      return handleClear();
    case 'mode':
      return handleMode(args);
    case 'theme':
      return handleTheme(args);
    case 'ascii':
      return handleAscii(args);
    case 'echo':
      return handleEcho(args);
    default:
      return handleUnknown(command);
  }
}

function handleHelp(): string {
  const lines = [fmt.sectionHeader('AVAILABLE COMMANDS'), ''];

  for (const cmd of AVAILABLE_COMMANDS) {
    const aliases = cmd.aliases?.length ? ` (${cmd.aliases.join(', ')})` : '';
    lines.push(fmt.title(`  ${cmd.name}`) + aliases);
    lines.push(fmt.dim(`    └─ ${cmd.description}`));
    lines.push(fmt.dim(`       Usage: ${cmd.usage}`));
    lines.push('');
  }

  lines.push(fmt.dim('Tip: Use Tab for autocomplete, ↑↓ for history'));
  return lines.join('\n');
}

function handleAbout(): string {
  const { name, title, bio, location, email, highlights } = aboutConfig;

  const lines = [
    fmt.sectionHeader('ABOUT ME'),
    '',
    fmt.title(name),
    fmt.subtitle(title),
    '',
    bio,
    '',
    `📍 ${fmt.highlight('Location:')} ${location}`,
    `📧 ${fmt.highlight('Email:')} ${email}`,
    '',
    fmt.title('Highlights:'),
    ...highlights.map(h => fmt.success(`  ✓ ${h}`)),
  ];

  return lines.join('\n');
}

function handleExperience(flags: Record<string, string | boolean>): string {
  const detailed = flags.detailed || flags.d;
  const lines = [fmt.sectionHeader('WORK EXPERIENCE'), ''];

  for (const exp of experienceConfig) {
    lines.push(fmt.title(`▸ ${exp.position}`));
    lines.push(fmt.subtitle(`  ${exp.company} | ${exp.location}`));
    lines.push(fmt.dim(`  ${exp.type} | ${exp.startDate} - ${exp.endDate}`));

    if (detailed) {
      lines.push('');
      lines.push(`  ${exp.description}`);
      lines.push('');
      lines.push(fmt.highlight('  Key Achievements:'));
      for (const a of exp.achievements) {
        lines.push(fmt.success(`    ✓ ${a}`));
      }
      lines.push('');
      lines.push(fmt.highlight('  Technologies:'));
      lines.push(fmt.dim(`    ${exp.technologies.join(' • ')}`));
    }

    lines.push('');
    lines.push(fmt.divider());
    lines.push('');
  }

  if (!detailed) {
    lines.push(fmt.dim('Tip: Use "experience --detailed" for more info'));
  }

  return lines.join('\n');
}

function handleProjects(
  args: string[],
  flags: Record<string, string | boolean>
): string {
  let projects = projectsConfig;

  if (flags.category) {
    const cat = String(flags.category).toLowerCase();
    projects = projects.filter(p => p.category.toLowerCase() === cat);
  }

  if (args[0] === 'show' && args[1]) {
    const project = projects.find(p => p.id === args[1]);
    if (!project) {
      return fmt.error(`Error: Project "${args[1]}" not found`);
    }

    const lines = [
      fmt.sectionHeader(project.title.toUpperCase()),
      '',
      fmt.subtitle(`${project.category} • ${project.status}`),
      '',
      project.longDescription,
      '',
      fmt.highlight('Technologies:'),
      fmt.dim(`  ${project.technologies.join(' • ')}`),
      '',
      fmt.highlight('Highlights:'),
      ...project.highlights.map(h => fmt.success(`  ✓ ${h}`)),
      '',
      fmt.highlight('Links:'),
      ...Object.entries(project.links).map(([k, v]) => `  ${k}: ${v}`),
    ];

    return lines.join('\n');
  }

  if (flags.all) {
    projects = projects;
  } else {
    projects = projects.filter(p => p.featured);
  }

  const lines = [fmt.sectionHeader(`PROJECTS (${projects.length})`), ''];

  for (const p of projects) {
    const icon = p.status === 'Completed' ? '✓' : '◦';
    const id = `<${p.id}>`;
    const statusStyle = p.status === 'Completed' ? fmt.success : fmt.warning;
    lines.push(fmt.title(`${icon} ${p.title} ${id}`));
    lines.push(statusStyle(`  ${p.category} | ${p.status}`));
    lines.push(`  ${p.description}`);
    lines.push(fmt.dim(`  Tech: ${p.technologies.join(', ')}`));
    lines.push('');
  }

  lines.push(
    fmt.dim('Tip: "projects show <id>" for details | "projects --all" for all')
  );
  return lines.join('\n');
}

function handleSkills(): string {
  const lines = [fmt.sectionHeader('TECHNICAL SKILLS'), ''];

  for (const cat of skillsConfig) {
    lines.push(fmt.title(`▸ ${cat.category}`));
    lines.push(`  ${cat.skills.join(' • ')}`);
    lines.push('');
  }

  return lines.join('\n');
}

function handleEducation(): string {
  const lines = [fmt.sectionHeader('EDUCATION'), ''];

  for (const edu of educationConfig) {
    lines.push(fmt.title(`▸ ${edu.degree} in ${edu.field}`));
    lines.push(fmt.subtitle(`  ${edu.institution}`));
    lines.push(
      fmt.dim(`  ${edu.location} | ${edu.startDate} - ${edu.endDate}`)
    );
    if (edu.gpa) {
      lines.push(fmt.highlight(`  GPA: ${edu.gpa}`));
    }
    if (edu.achievements?.length) {
      lines.push('');
      lines.push(fmt.highlight('  Achievements:'));
      for (const a of edu.achievements) {
        lines.push(fmt.success(`    ✓ ${a}`));
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

function handleCertifications(): string {
  const lines = [fmt.sectionHeader('CERTIFICATIONS'), ''];

  for (const cert of certificationsConfig) {
    lines.push(fmt.title(`▸ ${cert.name}`));
    lines.push(fmt.subtitle(`  ${cert.issuer} | ${cert.date}`));
    if (cert.credentialUrl) {
      lines.push(fmt.dim(`  ${cert.credentialUrl}`));
    }
    lines.push('');
  }

  return lines.join('\n');
}

function handleContact(): string {
  const { email, location, social } = contactConfig;

  const lines = [
    fmt.sectionHeader('CONTACT'),
    '',
    `📧 ${fmt.highlight('Email:')}    ${email}`,
    `📍 ${fmt.highlight('Location:')} ${location}`,
    '',
    fmt.title('Social Media:'),
    ...Object.entries(social).map(([p, u]) => `  ${fmt.dim(p + ':')} ${u}`),
  ];

  return lines.join('\n');
}

function handleSocial(): string {
  const { social } = contactConfig;
  const lines = [fmt.sectionHeader('SOCIAL MEDIA'), ''];

  for (const [platform, url] of Object.entries(social)) {
    lines.push(fmt.title(`▸ ${platform}`));
    lines.push(`  ${url}`);
    lines.push('');
  }

  return lines.join('\n');
}

function handleResume(flags: Record<string, string | boolean>): string {
  if (flags.download || flags.d) {
    return '__DOWNLOAD_RESUME__';
  }

  const lines = [
    fmt.sectionHeader('RESUME'),
    '',
    'To download my resume:',
    fmt.highlight('  resume --download'),
    '',
    'Or visit:',
    fmt.dim('  /resume.pdf'),
  ];

  return lines.join('\n');
}

function handleBlog(args: string[]): string {
  const subcommand = args[0];

  if (!subcommand) {
    const lines = [
      fmt.sectionHeader('BLOG'),
      '',
      'Available commands:',
      fmt.subtitle('  blog list              ') + '- List all blog posts',
      fmt.subtitle('  blog show <slug>       ') + '- Show a specific post',
      fmt.subtitle('  blog tags              ') + '- View all tags',
      '',
    ];
    return lines.join('\n');
  }

  if (subcommand === 'list') {
    return '__BLOG_LIST__';
  }

  if (subcommand === 'show' && args[1]) {
    return `__BLOG_SHOW__${args[1]}`;
  }

  if (subcommand === 'tags') {
    return '__BLOG_TAGS__';
  }

  return fmt.error('Unknown blog command. Type "blog" for help.');
}

function handleClear() {
  return '__CLEAR__';
}

function handleMode(args: string[]): string {
  const mode = args[0];

  if (!mode) {
    const lines = [
      fmt.sectionHeader('MODE'),
      '',
      fmt.highlight('Current mode: Terminal'),
      '',
      'Available modes:',
      fmt.subtitle('  • terminal') + ' - Terminal interface',
      fmt.subtitle('  • classic') + '  - Classic portfolio view',
      '',
      fmt.dim('Usage: mode [terminal | classic]'),
    ];
    return lines.join('\n');
  }

  if (mode === 'terminal' || mode === 'classic') {
    return '__MODE_' + mode.toUpperCase() + '__';
  }

  return fmt.error(`Error: Invalid mode "${mode}"`);
}

function handleTheme(args: string[]): string {
  const theme = args[0];

  if (!theme) {
    const lines = [
      fmt.sectionHeader('THEME'),
      '',
      fmt.highlight(
        'Current theme: ' +
          (localStorage.getItem('theme') === 'dark' ? 'Dark' : 'Light')
      ),
      '',
      'Available themes:',
      fmt.subtitle('  • dark  - Dark theme'),
      fmt.subtitle('  • light - Light theme'),
      '',
      fmt.dim('Usage: theme [dark | light]'),
    ];
    return lines.join('\n');
  }

  if (theme !== 'dark' && theme !== 'light') {
    return fmt.error(`Error: Invalid theme "${theme}"`);
  }

  return `__THEME_${theme.toUpperCase()}__`;
}

function handleAscii(args: string[]): string {
  const ascii = args[0];
  const asciiArt = asciiConfig.find(a => a.name === ascii);

  if (!ascii) {
    const lines = [
      fmt.sectionHeader('ASCII'),
      '',
      fmt.success('Available ASCII art:'),
      ...asciiConfig.map(a => fmt.subtitle(`  • ${a.name}`)),
      '',
      fmt.dim('Usage: ascii <ascii-name>'),
    ];
    return lines.join('\n');
  }

  if (asciiArt) {
    return asciiArt.value;
  }

  return fmt.error(`Error: Invalid ASCII art "${ascii}"`);
}

function handleEcho(args: string[]): string {
  if (args.length === 0) {
    return '';
  }
  return args.join(' ');
}

function handleUnknown(command: string): string {
  const suggestions = AVAILABLE_COMMANDS.filter(
    c => c.name.includes(command) || c.aliases?.some(a => a.includes(command))
  );

  const lines = [fmt.error(`Command not found: ${command}`)];

  if (suggestions.length > 0) {
    lines.push('');
    lines.push(fmt.dim('Did you mean:'));
    for (const s of suggestions) {
      lines.push(fmt.subtitle(`  ${s.name}`));
    }
  }

  lines.push('');
  lines.push(fmt.dim('Type "help" to see available commands'));

  return lines.join('\n');
}
