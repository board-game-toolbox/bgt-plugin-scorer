import { produce } from 'immer';
import { atom, getDefaultStore } from 'jotai';

/**
 * Constants
 */
const DEFAULT_ROW_NUM = 4;
const DEFAULT_COL_NUM = 6;

// const MAX_ROW_NUM = 16;
// const MAX_COL_NUM = 6;

/**
 * States
 */
export const j_rows = atom<string[]>(
  new Array(DEFAULT_ROW_NUM).fill(null).map((_, index) => `得分${index + 1}`),
);
export const j_cols = atom<string[]>(
  new Array(DEFAULT_COL_NUM).fill(null).map((_, index) => `玩家${index + 1}`),
);

export const j_scores = atom<number[][]>(
  new Array(DEFAULT_ROW_NUM)
    .fill(null)
    .map(() => new Array(DEFAULT_COL_NUM).fill(null).map(() => 0)),
);

/**
 * Functions
 */
export function updateColName(index: number, value: string) {
  getDefaultStore().set(
    j_cols,
    produce((draft) => {
      draft[index] = value;
    }),
  );
}

export function updateRowName(index: number, value: string) {
  getDefaultStore().set(
    j_rows,
    produce((draft) => {
      draft[index] = value;
    }),
  );
}

export function updateScore(row: number, col: number, value: number) {
  getDefaultStore().set(
    j_scores,
    produce((draft) => {
      draft[row][col] = value;
    }),
  );
}
