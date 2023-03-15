import { ChangeEvent, useEffect } from 'react';
import { memo, useCallback, useState } from 'react';
import { OnCellClick } from '../../components/MatrixCell';
import MatrixGrid from '../../components/MatrixGrid';
import type { Matrix, MatrixElement } from '../../models/Matrix';
import {
  calculateHighlightMask,
  CalculateHighlightMaskOptions,
  clearMatrixWithMask,
} from './helpers/masks';
import { immutableMatrixIncrementBothAxis } from './helpers/matrixIncrement';
import './index.css';
import {
  CellHighlight,
  FibonacciDirection,
  StartsWith,
} from './models';

const emptyMask: Matrix<CellHighlight> = new Array(50).fill(
  new Array(50).fill(CellHighlight.None),
);

export default memo(function FibonacciMatrix() {
  const [fibonacciDirection, setFibonacciDirection] = useState(
    FibonacciDirection.Downcast,
  );

  const [startsWith, setStartsWith] = useState(StartsWith.Zero);

  const [matrix, setMatrix] = useState<Matrix<MatrixElement>>(
    new Array(50).fill(new Array(50).fill(0)),
  );

  const [highlightMask, setHighlightMask] =
    useState<Matrix<CellHighlight>>(emptyMask);

  const changeStartsWith = (e: ChangeEvent<HTMLSelectElement>) => {
    const startsWith = Number(e.currentTarget.value);
    setStartsWith(startsWith);
    updateHighlightMask({ startsWith });
  };

  const changeFibonacciDirection = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const direction = Number(e.currentTarget.value);
    setFibonacciDirection(direction);
    updateHighlightMask({ direction });
  };

  const updateHighlightMask = useCallback(
    (options: Partial<CalculateHighlightMaskOptions>) => {
      const newMask = calculateHighlightMask({
        startsWith,
        direction: fibonacciDirection,
        sourceMatrix: matrix,
        sourceHighlightMask: emptyMask,
        ...options,
      });
      setHighlightMask(newMask);
      
      return newMask;
    },
    [matrix, startsWith, fibonacciDirection],
  );

  const increment: OnCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      const newMatrix = immutableMatrixIncrementBothAxis(
        matrix,
        rowIndex,
        colIndex,
      );
      setMatrix(newMatrix);
      updateHighlightMask({
        sourceMatrix: newMatrix,
        change: {
          rowIndex,
          colIndex,
        },
      });
    },
    [matrix, updateHighlightMask],
  );

  useEffect(() => {
    setMatrix(clearMatrixWithMask(matrix, highlightMask, CellHighlight.Fibonacci));
  // Don't use matrix as dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightMask])

  return (
    <div className="FibonacciMatrix">
      <div className="FibonacciMatrix-settings">
        <label>
          Fibonacci starts with:
          <select value={startsWith} onChange={changeStartsWith}>
            <option value={StartsWith.Zero}>0 (empty cells)</option>
            <option value={StartsWith.One}>1</option>
            <option value={StartsWith.Any}>
              Any (subsequential)
            </option>
          </select>
        </label>

        <label>
          Fibonacci direction:
          <select
            value={fibonacciDirection}
            onChange={changeFibonacciDirection}
          >
            <option value={FibonacciDirection.Downcast}>
              Downcast (top -&gt; bottom, left -&gt; right)
            </option>
            <option value={FibonacciDirection.Upcast}>
              Upcast (top &lt;- bottom, left &lt;- right)
            </option>
            <option value={FibonacciDirection.Any}>
              Any (top &lt;-&gt; bottom, left &lt;-&gt; right)
            </option>
          </select>
        </label>
      </div>

      <MatrixGrid
        matrixValues={matrix}
        highlightMask={highlightMask}
        onCellClick={increment}
      />
    </div>
  );
});
