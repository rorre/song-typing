import { useState } from "react";
import { Metadata } from "../../types";
import { Link, useRouter } from "@tanstack/react-router";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { MdRefresh } from "react-icons/md";
import { processSongsFolder } from "../../core/songs";
import SettingsModal from "./SettingsModal";
import { scoreManager } from "../../core/score";

export default function SelectScreen({ songs }: { songs: Metadata[] }) {
  const [songId, setSongId] = useState(-1);
  const [isProcessing, setProcessing] = useState(false);
  const selectedSong = songId == -1 ? null : songs[songId];
  const router = useRouter();
  const currentHighscore = selectedSong
    ? scoreManager.getScore(selectedSong.id)
    : null;

  async function onRefreshClicked() {
    setProcessing(true);
    await processSongsFolder();
    router.invalidate();
    setProcessing(false);
  }

  if (isProcessing) {
    return (
      <div className="flex flex-row gap-8 h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <strong className="text-xl text-center">
          Processing songs folder...
        </strong>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8 h-screen">
      <div className="flex flex-col gap-2 w-full pt-4">
        <div className="flex flex-row justify-end gap-4">
          <SettingsModal />
          <button
            className="rounded-full p-2 hover:bg-base-200"
            onClick={() => onRefreshClicked()}
          >
            <MdRefresh size={24} />
          </button>
        </div>
        {songs.map((song, idx) => (
          <div
            className="p-4 rounded-r-lg bg-base-200 cursor-pointer"
            key={song.id}
            onClick={() => setSongId(idx)}
          >
            <strong>
              {song.artist} - {song.title}
            </strong>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-4 bg-base-200 items-center text-center min-w-[24rem] w-1/4">
        {selectedSong == null ? (
          <span className="my-auto">No song selected</span>
        ) : (
          <>
            <img
              src={
                selectedSong.cover
                  ? convertFileSrc(selectedSong.path + "/" + selectedSong.cover)
                  : "/music-placeholder.webp"
              }
              className="w-full aspect-square"
            />

            <strong className="text-2xl">{selectedSong.title}</strong>
            <p className="-mt-2">{selectedSong.artist}</p>
            <div className="px-4 py-3 font-bold bg-base-100 rounded-md flex flex-row justify-between w-full">
              <span>Difficulty</span>
              <span>{selectedSong.difficulty}</span>
            </div>

            <div className="px-4 py-3 font-bold bg-base-100 rounded-md flex flex-row justify-between w-full">
              <span>High score</span>
              <span>{currentHighscore?.score ?? "None"}</span>
            </div>

            <Link
              to="/play/$songId"
              params={{
                songId: selectedSong.id,
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
