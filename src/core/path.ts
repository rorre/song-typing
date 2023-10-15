import { resourceDir } from "@tauri-apps/api/path";

export async function normalizePath(path: string) {
  const baseDir = await resourceDir();

  let finalPath = path;

  // Windows fix, remove \\?\ prefix from FS
  finalPath = finalPath.replace(baseDir, "");
  finalPath = finalPath.replace(/\\\\\?\\/, "");
  finalPath = finalPath.replace(/\\/g, "/");
  return finalPath;
}

export function convertSongsSrc(path: string) {
  return `http://localhost:17270/${path.replace("songs/", "")}`;
}
