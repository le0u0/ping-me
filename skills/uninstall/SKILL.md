---
name: uninstall
description: Remove Agent Notifier's popup helper and saved preferences from macOS before deleting the plugin.
disable-model-invocation: true
---

Confirm with the user first; this deletes their saved editor, duration, and sound choices.

1. Run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --uninstall`. It deletes the popup helper
   in `~/Library/Application Support/AgentNotifierIcon` and the saved preferences
   (`agent-notifier.json`, respecting `CLAUDE_CONFIG_DIR`). Report what it removed.
2. Tell the user to run `/plugin uninstall agent-notifier@plugins` and restart
   Claude Code. The plugin's hooks go with the plugin, so leave `settings.json` alone.
