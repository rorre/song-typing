import { readDir, BaseDirectory } from "@tauri-apps/api/fs";

export async function processSongsFolder() {
  const dirs = await readDir("songs", { dir: BaseDirectory.Resource });

  for (const entry of dirs) {
    console.log(`Entry: ${entry.path}`);
    if (!entry.children) continue;
    if (!entry.children.find((e) => e.name === "songs.json")) continue;
  }
}
