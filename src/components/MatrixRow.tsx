import { memo } from 'react';
import { CellHighlight } from '../containers/FibonacciMatrix/models';
import { MatrixElement, MatrixRow } from '../models/Matrix';
import MatrixCell, { OnCellClick } from './MatrixCell';

export interface MatrixRowProps {
  rowIndex: number;
  rowValues: MatrixRow<MatrixElement>;
  rowHighlights: MatrixRow<CellHighlight>;
  onCellClick: OnCellClick;
}

export default memo(function MatrixRow({
  rowValues,
  rowHighlights,
  rowIndex,
  onCellClick,
}: MatrixRowProps) {
  return (
    <>
      {rowValues.map((value, colIndex) => (
        <MatrixCell
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={colIndex}
          value={value}
          highlight={rowHighlights[colIndex]}
          onClick={onCellClick}
        />
      ))}
    </>
  );
});
