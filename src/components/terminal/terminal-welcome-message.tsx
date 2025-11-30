import React from 'react';

function TerminalWelcomeMessage() {
  return (
    <div className="mb-8 space-y-4">
      <pre className="hidden text-sm font-bold text-black sm:text-xs md:block dark:text-white">
        {`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗   ║
║   ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝   ║
║   ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗     ║
║   ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝     ║
║   ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗   ║
║    ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
        `}
      </pre>
      <div className="space-y-2 font-bold text-black dark:text-white">
        <p>
          Type <span className="text-yellow-400">help</span> to see available
          commands.
        </p>
        <p>
          Type <span className="text-yellow-400">about</span> to learn more
          about me.
        </p>
        <p className="text-xs text-gray-500">
          Tip: Use Tab for autocomplete, ↑↓ for command history
        </p>
      </div>
    </div>
  );
}

export default React.memo(TerminalWelcomeMessage);
