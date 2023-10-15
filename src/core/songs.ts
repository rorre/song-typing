import { readDir, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { LyricData, Metadata } from "../types";
import { getDb, DatabaseTable } from "./db";
import md5 from "md5";
import { normalizePath } from "./path";

export async function getSong(songId: string) {
  const db = await getDb();
  const result = await db.select<Metadata[]>(
    "SELECT * FROM songs WHERE id = $1",
    [songId]
  );

  const song = result[0];
  const lyricsOriginal = (
    JSON.parse(
      await readTextFile(song.path + "/lyrics.json", {
        dir: BaseDirectory.Resource,
      })
    ) as unknown[]
  ).map((data) => LyricData.parse(data));
  const lyrics = lyricsOriginal.map((lyric) => ({
    ...lyric,
    lyric: lyric.lyric.toLowerCase(),
  }));

  // HACK: We cannot recalculate last line because after last line it will
  //       remove the gameplay component, so we hack it by adding an empty
  //       lyric line
  lyrics.push({
    startTime: lyrics[lyrics.length - 1].endTime,
    endTime: lyrics[lyrics.length - 1].endTime,
    lyric: "",
    ignore: true,
  });
  return {
    ...song,
    lyrics: lyrics,
  };
}

export async function getAllSongs() {
  const db = await getDb();
  return await db.select<DatabaseTable<Metadata>[]>("SELECT * FROM songs");
}

export async function processSongsFolder() {
  const db = await getDb();
  const dirs = await readDir("songs", {
    dir: BaseDirectory.Resource,
    recursive: true,
  });

  const resolvedSongs: Metadata[] = [];
  for (const entry of dirs) {
    if (!entry.children) continue;
    const songFile = entry.children.find((e) => e.name === "song.json");
    if (!songFile) continue;

    const songFolder = await normalizePath(entry.path);
    const songFilePath = await normalizePath(songFile.path);

    const jsonContent = await readTextFile(songFilePath, {
      dir: BaseDirectory.Resource,
    });
    const data = Metadata.parse({
      path: songFolder,
      id: md5(jsonContent),
      ...JSON.parse(jsonContent),
    });

    resolvedSongs.push(data);
  }

  // TODO: Only update changed songs
  await db.execute("DELETE FROM songs;");
  // FIXME: Can be squished into 1 query!
  resolvedSongs.forEach(async (song) => {
    await db.execute(
      "INSERT INTO songs (id, artist, title, cover, src, difficulty, path) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        song.id,
        song.artist,
        song.title,
        song.cover,
        song.src,
        song.difficulty,
        song.path,
      ]
    );
  });

  return resolvedSongs;
}
