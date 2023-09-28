import React from "react";
import Modal from "../Modal";
import { MdOutlineSettings } from "react-icons/md";
import { useAtom } from "jotai";
import { enforceSpaceAtom, offsetAtom } from "../../core/settings";

export default function SettingsModal() {
  const [offset, setOffset] = useAtom(offsetAtom);
  const [enforceSpace, setEnforceSpace] = useAtom(enforceSpaceAtom);

  return (
    <Modal
      trigger={
        <button className="rounded-full p-2 hover:bg-base-200">
          <MdOutlineSettings size={24} />
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <h5 className="font-bold text-xl">Settings</h5>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <strong>Offset</strong>
            <span className="text-gray-400 text-sm">
              + if its too late, - if its too early
            </span>
          </div>
          <input
            type="number"
            value={offset}
            className="input input-bordered w-32"
            onChange={(e) => setOffset(e.target.valueAsNumber)}
          />
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <strong>Enforce space</strong>
            <span className="text-gray-400 text-sm">
              Whether to enforce space or not during gameplay
            </span>
          </div>
          <input
            type="checkbox"
            className="toggle"
            checked={enforceSpace}
            onChange={(e) => setEnforceSpace(e.target.checked)}
          />
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">OK</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
