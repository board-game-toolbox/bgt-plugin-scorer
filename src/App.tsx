import { useAtomValue } from 'jotai';
import './App.css';
import {
  j_cols,
  j_rows,
  j_scores,
  updateColName,
  updateRowName,
  updateScore,
} from './logic';

function App() {
  const rows = useAtomValue(j_rows);
  const cols = useAtomValue(j_cols);
  const scores = useAtomValue(j_scores);

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
          <tr key={`row-${rowIndex}`}>
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
                    console.log(scores);
                  }}
                ></input>
              </td>
            ))}
          </tr>
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

function removePreZero(s: string): string {
  return s.replace(/^(?!0$)0*([1-9][0-9]*)$/, '$1');
}

export default App;
