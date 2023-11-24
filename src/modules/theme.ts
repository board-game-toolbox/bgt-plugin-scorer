import { getDefaultStore } from 'jotai';
import { createScores, j_cols, j_rows, j_scores } from '.';

export interface Theme {
  rows: string[];
  cols: string[];

  style: {
    headBg: string;
    footBg: string;
    oddRowBg: string;
    evenRowBg: string;
    borderColor: string;
  };
}

const DEFAULT_ROW_NUM = 6;
const DEFAULT_COL_NUM = 4;

export const DEFAULT_THEME: Theme = {
  rows: new Array(DEFAULT_ROW_NUM)
    .fill(null)
    .map((_, index) => `得分${index + 1}`),
  cols: new Array(DEFAULT_COL_NUM)
    .fill(null)
    .map((_, index) => `玩家${index + 1}`),

  style: {
    headBg: '##FFFFFF',
    footBg: '#FFFFFF',
    oddRowBg: '#E1F5FE',
    evenRowBg: '#F1F8E9',
    borderColor: 'transparent',
  },
};

export const GREAT_WESTERN_TRAIL_THEME: Theme = {
  rows: [
    '5块1分',
    '建筑',
    '城市',
    '车站',
    '灾害',
    '牛牌',
    '目标',
    '站长',
    '工人',
    '黑片3分',
    '结束2分',
  ],
  cols: new Array(4).fill(null).map((_, index) => `牛仔${index + 1}`),

  style: {
    headBg: '#e5ddcd',
    footBg: '#e5ddcd',
    oddRowBg: '#bdaa99',
    evenRowBg: '#dbc998',
    borderColor: '#88695f',
  },
};

export function setTheme(theme: Theme) {
  const store = getDefaultStore();
  store.set(j_rows, theme.rows);
  store.set(j_cols, theme.cols);
  store.set(j_scores, createScores(theme.rows.length, theme.cols.length));

  document.documentElement.style.setProperty('--head-bg', theme.style.headBg);
  document.documentElement.style.setProperty('--foot-bg', theme.style.footBg);
  document.documentElement.style.setProperty(
    '--odd-row-bg',
    theme.style.oddRowBg,
  );
  document.documentElement.style.setProperty(
    '--even-row-bg',
    theme.style.evenRowBg,
  );
  document.documentElement.style.setProperty(
    '--border-color',
    theme.style.borderColor,
  );
}
