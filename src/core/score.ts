import { Score } from "../types";

export class ScoreManager {
  _data: Map<string, Score>;

  constructor() {
    this._data = new Map(
      Object.entries(JSON.parse(localStorage.getItem("scores") ?? "[]"))
    );
  }

  getScore(id: string) {
    return this._data.get(id);
  }

  setScore(id: string, score: number) {
    this._data.set(id, {
      id,
      score,
    });

    localStorage.setItem(
      "scores",
      JSON.stringify(Object.fromEntries(this._data))
    );
    return;
  }
}

export const scoreManager = new ScoreManager();
