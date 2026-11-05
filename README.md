# SchémaBuild – Minecraft Mod for Importing and Placing Structures

SchémaBuild is a Minecraft Bedrock mod that lets you import a `.mcstructure` build file and place it directly in your world with a simple command or menu click. No coding required—drop your structure file, run the function, and the build appears in front of you. The mod supports multiple rotations (0°, 90°, 180°, 270°) and includes a save feature to export areas of your world as new structures.

## Install

1. **Enable required experiments**: In your Minecraft world settings, turn on "Hacks d'expérimental" and then "GameTest Framework" (mandatory for scripts to run).
2. **Add the behavior pack**: Put the `BP` folder (or `.mcpack` file) into your world's behavior packs. Optionally, add the `RP` resource pack for the pack icon.
3. **Place your structure file**: Put your `.mcstructure` file into the `BP/structures/` folder. For example, name it `build.mcstructure`.
4. **Set the structure ID**: Open `BP/scripts/main.js` and set `const STRUCTURE_ID = "schematic:build";` (replace `build` with your file's name).

## Use

1. **Open the menu**: In-game, hold a stick and right-click, or run `/function schematic:menu`.
2. **Choose an option**: Click "Placer le build" to place it at rotation 0, or select one of the rotation buttons (90°, 180°, 270°) to rotate the build.
3. **Place the build**: The structure appears 4 blocks in front of you, at your feet level. You can change the distance by editing `PLACE_DISTANCE` in `scripts/main.js`.
4. **Save a zone**: From the menu, choose "Sauvegarder la zone actuelle" to export a 16×16×16 area in front of you as a new `.mcstructure` file.
5. **Quick place**: Run `/function schematic:place` to place the build immediately at rotation 0 without opening the menu.

**Troubleshooting**: If you get a message "Structure introuvable", make sure the `.mcstructure` file is in the correct folder and the `STRUCTURE_ID` matches the file name (e.g., `schematic:build` for `build.mcstructure`).

---

More Minecraft mod projects by EnderDevelopment: https://github.com/EnderDevelopment

Project page: https://dash.enderdevelopment.com/community/a3b88526-297a-491b-833f-84ee87cb314d?utm_source=github&utm_medium=readme&utm_campaign=auto_publish&utm_content=a3b88526-297a-491b-833f-84ee87cb314d
