import { useState } from "react";
import { Metadata } from "../../types";
import { Link } from "@tanstack/react-router";

export default function SelectScreen({ songs }: { songs: Metadata[] }) {
  const [songId, setSongId] = useState(-1);
  const selectedSong = songId == -1 ? null : songs[songId];

  return (
    <div className="flex flex-row gap-8 h-screen">
      <div className="flex flex-col gap-2 w-full pt-4">
        {songs.map((song, idx) => (
          <div
            className="p-4 rounded-r-lg bg-base-200 cursor-pointer"
            key={song.song}
            onClick={() => setSongId(idx)}
          >
            <strong>{song.song}</strong>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-4 bg-base-200 items-center text-center w-64">
        {selectedSong == null ? (
          "No song selected"
        ) : (
          <>
            <strong>{selectedSong.song}</strong>
            <span>Difficulty: {selectedSong.difficulty}</span>

            <Link
              to="/play/$songId"
              params={{
                songId: songId.toString(),
              }}
              className="w-full mt-auto"
            >
              <button className="btn btn-primary w-full">Play</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
