import { produce } from 'immer';
import { atom, getDefaultStore } from 'jotai';
import { DEFAULT_THEME } from './theme';

/**
 * Constants
 */

const MAX_ROW_NUM = 12;
const MAX_COL_NUM = 6;

const TOUCH_MOVE_THRESHOLD = 150;

/**
 * States
 */
export const j_rows = atom<string[]>(DEFAULT_THEME.rows);
export const j_cols = atom<string[]>(DEFAULT_THEME.cols);

export const j_scores = atom<number[][]>(
  createScores(DEFAULT_THEME.rows.length, DEFAULT_THEME.cols.length),
);

/**
 * Mutations
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
    produce((scores) => {
      scores[row][col] = value;
    }),
  );
}

export function addRow() {
  const store = getDefaultStore();
  const row = store.get(j_rows).length;
  const col = store.get(j_cols).length;

  if (row === MAX_ROW_NUM) {
    window.bgt?.toast(`最多${MAX_ROW_NUM}行`);
    return;
  }

  store.set(
    j_rows,
    produce((rows) => {
      rows.push(`得分${row + 1}`);
    }),
  );
  store.set(
    j_scores,
    produce((scores) => {
      scores.push(new Array(col).fill(null).map(() => 0));
    }),
  );
}
export function removeRow() {
  const store = getDefaultStore();
  const row = store.get(j_rows).length;

  if (row === 1) {
    window.bgt?.toast(`不能再少啦`);
    return;
  }

  store.set(
    j_rows,
    produce((rows) => {
      rows.pop();
    }),
  );
  store.set(
    j_scores,
    produce((scores) => {
      scores.pop();
    }),
  );
}
export function addCol() {
  const store = getDefaultStore();
  const col = store.get(j_cols).length;

  if (col === MAX_COL_NUM) {
    window.bgt?.toast(`最多${MAX_COL_NUM}列`);
    return;
  }

  store.set(
    j_cols,
    produce((cols) => {
      cols.push(`玩家${col + 1}`);
    }),
  );
  store.set(
    j_scores,
    produce((scores) => {
      scores.forEach((rowScore) => rowScore.push(0));
    }),
  );
}
export function removeCol() {
  const store = getDefaultStore();
  const col = store.get(j_cols).length;

  if (col === 1) {
    window.bgt?.toast(`不能再少啦`);
    return;
  }

  store.set(
    j_cols,
    produce((cols) => {
      cols.pop();
    }),
  );
  store.set(
    j_scores,
    produce((scores) => {
      scores.forEach((rowScore) => rowScore.pop());
    }),
  );
}

let startX = 0;
let startY = 0;
let touching = false;
export function onTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  touching = true;
}
export function onTouchMove(e: TouchEvent) {
  if (!touching) return;

  const curX = e.touches[0].clientX;
  const curY = e.touches[0].clientY;

  const deltaX = curX - startX;
  const deltaY = curY - startY;
  if (Math.abs(deltaX) > TOUCH_MOVE_THRESHOLD) {
    touching = false;
    // to right, add row
    if (deltaX > 0) {
      addRow();
    }
    // to left, remove row
    else if (deltaX < 0) {
      removeRow();
    }
  } else if (Math.abs(deltaY) > TOUCH_MOVE_THRESHOLD) {
    touching = false;
    // to bottom, add col
    if (deltaY > 0) {
      addCol();
    }
    // to top, remove col
    else if (deltaY < 0) {
      removeCol();
    }
  }
}
export function onTouchEnd() {
  if (touching) touching = false;
}

/**
 * Utils
 */
export function createScores(row: number, col: number) {
  return new Array(row)
    .fill(null)
    .map(() => new Array(col).fill(null).map(() => 0));
}

export function removePreZero(s: string): string {
  return s.replace(/^(?!0$)0*([1-9][0-9]*)$/, '$1');
}
