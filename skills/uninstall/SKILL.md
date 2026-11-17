---
name: uninstall
description: Remove Ping Me's popup helper and saved preferences from macOS before deleting the plugin.
disable-model-invocation: true
---

Confirm with the user first; this deletes their saved editor, duration, and sound choices.
Replace `<plugin-root>` with this plugin's root directory.

1. Run `node "<plugin-root>/src/init.js" --uninstall`. It deletes the popup helper
   in `~/Library/Application Support/PingMeIcon` and the saved preferences
   (`ping-me.json`, respecting `CLAUDE_CONFIG_DIR`). Report what it removed.
2. Tell the user to uninstall the plugin via their client's plugin manager and restart
   if required. Leave `settings.json` alone.
