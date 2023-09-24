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
            key={song.artist + song.title}
            onClick={() => setSongId(idx)}
          >
            <strong>
              {song.artist} - {song.title}
            </strong>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-4 bg-base-200 items-center text-center min-w-96 w-1/4">
        {selectedSong == null ? (
          "No song selected"
        ) : (
          <>
            <img
              src={selectedSong.cover ?? "/music-placeholder.webp"}
              className="w-full aspect-square"
            />

            <strong className="text-2xl">{selectedSong.title}</strong>
            <p className="-mt-2">{selectedSong.artist}</p>
            <div className="px-4 py-3 font-bold bg-base-100 rounded-md flex flex-row justify-between w-full">
              <span>Difficulty</span>
              <span>{selectedSong.difficulty}</span>
            </div>

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
