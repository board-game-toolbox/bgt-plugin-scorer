import { useAtom, useAtomValue } from 'jotai';
import './App.css';
import {
  j_cols,
  j_dialog_show,
  j_rows,
  j_scores,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  removePreZero,
  updateColName,
  updateRowName,
  updateScore,
} from './modules';
import { useEffect } from 'react';
import {
  DEFAULT_THEME,
  GREAT_WESTERN_TRAIL_THEME,
  setTheme,
} from './modules/theme';

function App() {
  const rows = useAtomValue(j_rows);
  const cols = useAtomValue(j_cols);
  const scores = useAtomValue(j_scores);
  const [show, setShow] = useAtom(j_dialog_show);

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td className="more" onClick={() => setShow(true)}>
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6721"
                width="256"
                height="256"
              >
                <path
                  d="M288 456.864A63.264 63.264 0 0 0 256 448a64 64 0 1 0 0 128c11.712 0 22.56-3.392 32-8.896 19.04-11.072 32-31.488 32-55.104 0-23.648-12.96-44.064-32-55.136M544 456.864A63.264 63.264 0 0 0 512 448c-11.712 0-22.56 3.36-32 8.864-19.04 11.072-32 31.488-32 55.136 0 23.616 12.96 44.032 32 55.104 9.44 5.504 20.288 8.896 32 8.896s22.56-3.392 32-8.896c19.04-11.072 32-31.488 32-55.104 0-23.648-12.96-44.064-32-55.136M768 448c-11.712 0-22.56 3.392-32 8.864-19.04 11.104-32 31.52-32 55.136 0 23.616 12.96 44.032 32 55.136 9.44 5.472 20.288 8.864 32 8.864a64 64 0 1 0 0-128"
                  fill="#3E3A39"
                  p-id="6722"
                ></path>
              </svg>
            </td>
            {cols.map((col, index) => (
              <td key={`col-${index}`}>
                <input
                  value={col}
                  onChange={(e) => updateColName(index, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <Row key={`row-${rowIndex}`} row={row} rowIndex={rowIndex} />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>总分</td>
            {cols.map((_, index) => (
              <td key={`sum-${index}`}>
                {scores.reduce((sum, row) => sum + row[index], 0)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
      <div
        className={'modal ' + (show ? 'modal__show' : 'modal__hide')}
        onClick={() => setShow(false)}
      >
        <div className="dialog" onClick={(e) => e.stopPropagation()}>
          <div className="dialog__block">
            <h1>使用模板</h1>
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
          <div className="dialog__block">
            <h1>导出截图</h1>
            <span
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              功能开发中，敬请期待
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ row, rowIndex }: { row: string; rowIndex: number }) {
  const cols = useAtomValue(j_cols);
  const scores = useAtomValue(j_scores);
  return (
    <tr>
      <td>
        <input
          value={row}
          onChange={(e) => updateRowName(rowIndex, e.target.value)}
        />
      </td>
      {cols.map((_, colIndex) => (
        <td key={`cell-${rowIndex}-${colIndex}`}>
          <input
            type="number"
            value={removePreZero(scores[rowIndex][colIndex].toString())}
            onChange={(e) => {
              let value = e.target.value;
              value = removePreZero(value);
              value = value.substring(0, 6);
              updateScore(rowIndex, colIndex, parseInt(value));
            }}
          ></input>
        </td>
      ))}
    </tr>
  );
}

export default App;
