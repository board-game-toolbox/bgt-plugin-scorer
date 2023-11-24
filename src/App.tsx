import { useAtomValue } from 'jotai';
import './App.css';
import {
  j_cols,
  j_rows,
  j_scores,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  removePreZero,
  updateColName,
  updateRowName,
  updateScore,
} from './logic';
import { useEffect } from 'react';

function App() {
  const rows = useAtomValue(j_rows);
  const cols = useAtomValue(j_cols);
  const scores = useAtomValue(j_scores);

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
    <table>
      <thead>
        <tr>
          <td></td>
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
