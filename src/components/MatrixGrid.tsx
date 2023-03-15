import { CSSProperties, memo } from 'react';
import { CellHighlight } from '../containers/FibonacciMatrix/models';
import type { Matrix, MatrixElement } from '../models/Matrix';
import type { OnCellClick } from './MatrixCell';
import './MatrixGrid.css';
import MatrixRow from './MatrixRow';

export interface MatrixGridProps {
  matrixValues: Matrix<MatrixElement>;
  highlightMask: Matrix<CellHighlight>;
  onCellClick: OnCellClick;
}

export default memo(function MatrixGrid({
  matrixValues,
  highlightMask,
  onCellClick,
}: MatrixGridProps) {
  // This variable can be reused in CSS for countless styling approaches…
  const style: CSSProperties = {
    '--grid-columns': matrixValues[0].length,
  };

  return (
    <div className="MatrixGrid" style={style}>
      {matrixValues.map((value, rowIndex) => (
        <MatrixRow
          rowIndex={rowIndex}
          key={rowIndex}
          rowValues={value}
          rowHighlights={highlightMask[rowIndex]}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
});
