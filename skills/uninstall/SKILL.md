---
name: uninstall
description: Remove Ping Me's popup helper and saved preferences from macOS before deleting the plugin.
disable-model-invocation: true
---

Confirm with the user first; this deletes their saved editor, duration, and sound choices.

1. Run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --uninstall`. It deletes the popup helper
   in `~/Library/Application Support/PingMeIcon` and the saved preferences
   (`ping-me.json`, respecting `CLAUDE_CONFIG_DIR`). Report what it removed.
2. Tell the user to run `/plugin uninstall ping-me@plugins` and restart
   Claude Code. The plugin's hooks go with the plugin, so leave `settings.json` alone.
