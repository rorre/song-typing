import { readDir, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { resourceDir } from "@tauri-apps/api/path";
import { Metadata } from "../types";

export async function processSongsFolder() {
  const baseDir = await resourceDir();
  const dirs = await readDir("songs", {
    dir: BaseDirectory.Resource,
    recursive: true,
  });

  const resolvedSongs: Metadata[] = [];
  for (const entry of dirs) {
    console.log(entry.path);
    if (!entry.children) continue;
    const songFile = entry.children.find((e) => e.name === "song.json");

    // Windows fix, remove \\?\ prefix from FS
    const songFolder = entry.path.replace(/\\\\\?\\/, "");
    if (!songFile) continue;

    const data = Metadata.parse({
      path: songFolder,
      ...JSON.parse(
        await readTextFile(songFile.path.replace(baseDir, ""), {
          dir: BaseDirectory.Resource,
        })
      ),
    });

    resolvedSongs.push(data);
  }

  return resolvedSongs;
}
