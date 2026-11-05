import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// ===== CONFIGURATION =====
// The id of your structure file. Place a file named "build.mcstructure"
// inside the behavior pack's "structures" folder, then set:
const STRUCTURE_ID = "schematic:build";

// The block (x, y, z) inside the structure used as the placement anchor.
// Usually the corner where you want the build to "start" at your feet.
const ANCHOR_OFFSET = { x: 0, y: 0, z: 0 };

// Horizontal distance (in blocks) in front of the player where the build appears.
const PLACE_DISTANCE = 4;
// =========================

const ROTATIONS = [0, 90, 180, 270];

function getStructure() {
  try {
    return world.structureManager.get(STRUCTURE_ID);
  } catch {
    return null;
  }
}

function placementOrigin(player) {
  const loc = player.location;
  const dir = player.getDirection();
  const target = {
    x: Math.floor(loc.x + dir.x * PLACE_DISTANCE),
    y: Math.floor(loc.y),
    z: Math.floor(loc.z + dir.z * PLACE_DISTANCE)
  };
  return {
    x: target.x - ANCHOR_OFFSET.x,
    y: target.y - ANCHOR_OFFSET.y,
    z: target.z - ANCHOR_OFFSET.z
  };
}

function placeStructure(player, rotation) {
  const structure = getStructure();
  if (!structure) {
    player.sendMessage("§cStructure introuvable : " + STRUCTURE_ID);
    player.sendMessage("§7Ajoute le fichier .mcstructure dans le dossier structures du pack.");
    return;
  }
  const origin = placementOrigin(player);
  try {
    world.structureManager.place(STRUCTURE_ID, player.dimension, origin, {
      rotation: rotation
    });
    player.sendMessage("§aBuild placé (" + rotation + "°) à " +
      origin.x + ", " + origin.y + ", " + origin.z);
  } catch (e) {
    player.sendMessage("§cErreur de placement : " + e);
  }
}

function saveSelection(player) {
  // Uses the player's position as the origin of a new structure.
  const origin = placementOrigin(player);
  const size = { x: 16, y: 16, z: 16 };
  try {
    const structure = world.structureManager.createFromWorld(
      STRUCTURE_ID, player.dimension, origin, size, {}
    );
    world.structureManager.saveToWorld(structure);
    player.sendMessage("§aStructure sauvegardée. Exporte-la avec /structure " + STRUCTURE_ID);
  } catch (e) {
    player.sendMessage("§cErreur d'export : " + e);
  }
}

function openMenu(player) {
  const form = new ActionFormData()
    .title("Schematic Addon")
    .body("Structure : " + STRUCTURE_ID)
    .button("§aPlacer le build")
    .button("§ePlacer (rotation 90°)")
    .button("§ePlacer (rotation 180°)")
    .button("§ePlacer (rotation 270°)")
    .button("§bSauvegarder la zone actuelle");

  form.show(player).then((res) => {
    if (res.canceled) return;
    const choice = res.selection;
    if (choice === 0) placeStructure(player, 0);
    else if (choice === 1) placeStructure(player, 90);
    else if (choice === 2) placeStructure(player, 180);
    else if (choice === 3) placeStructure(player, 270);
    else if (choice === 4) saveSelection(player);
  });
}

// Trigger with an item: hold a stick and use it (right click).
world.afterEvents.itemUse.subscribe((ev) => {
  const item = ev.itemStack;
  if (item && item.typeId === "minecraft:stick") {
    openMenu(ev.source);
  }
});

// Alternative trigger from command line:
//   /scriptevent schematic:menu
world.afterEvents.scriptEvent.subscribe((ev) => {
  if (ev.id === "schematic:menu" && ev.sourceEntity) {
    const player = ev.sourceEntity;
    if (player.typeId === "minecraft:player") openMenu(player);
  }
});

// Quick place without menu (default rotation 0):
//   /scriptevent schematic:place
world.afterEvents.scriptEvent.subscribe((ev) => {
  if (ev.id === "schematic:place" && ev.sourceEntity) {
    const player = ev.sourceEntity;
    if (player.typeId === "minecraft:player") placeStructure(player, ROTATIONS[0]);
  }
});
