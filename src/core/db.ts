import Database from "tauri-plugin-sql-api";

export type DatabaseTable<T> = T & {
  id: number;
};
let db: Database | null = null;

export async function getDb() {
  if (!db) db = await Database.load("sqlite:data.db");
  return db;
}

export async function migrate() {
  const db = await getDb();
  try {
    // TODO: Migrate to higher version of DB
    await db.select<number>("SELECT version FROM metadata");
  } catch {
    await db.execute("CREATE TABLE metadata (version int)");
    await db.execute(`CREATE TABLE songs (
      id TEXT NOT NULL PRIMARY KEY,
      artist TEXT,
      title TEXT,
      cover TEXT,
      src TEXT,
      difficulty int,
      path TEXT
    );`);
    await db.execute("INSERT INTO metadata VALUES (1);");
  }
}
