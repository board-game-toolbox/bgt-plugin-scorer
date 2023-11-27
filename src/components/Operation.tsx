import { useSetAtom } from 'jotai';
import { exportPNG } from '../modules/export';
import {
  setTheme,
  DEFAULT_THEME,
  GREAT_WESTERN_TRAIL_THEME,
} from '../modules/theme';
import './Operation.css';
import Export from './Export';
import { j_dialog_show, showDialog } from '../modules/dialog';

function Operation() {
  const setShow = useSetAtom(j_dialog_show);
  return (
    <>
      <div className="operation__block">
        <h1>模板</h1>
        <div>
          <button
            onClick={() => {
              setTheme(DEFAULT_THEME);
              setShow(false);
            }}
          >
            默认
          </button>
          <button
            onClick={() => {
              setTheme(GREAT_WESTERN_TRAIL_THEME);
              setShow(false);
            }}
          >
            大西部之路
          </button>
        </div>
      </div>
      <div className="operation__block">
        <h1>导出</h1>
        <button
          onClick={() => {
            showDialog(<Export />, false);
            exportPNG();
          }}
        >
          导出截图
        </button>
      </div>
    </>
  );
}

export default Operation;
