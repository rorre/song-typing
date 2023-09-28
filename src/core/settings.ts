import { atomWithStorage } from "jotai/utils";

export const offsetAtom = atomWithStorage("offset", 0);
export const enforceSpaceAtom = atomWithStorage("enforceSpace", false);
