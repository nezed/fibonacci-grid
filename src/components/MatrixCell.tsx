import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import './MatrixCell.css';
import { MatrixElement } from '../models/Matrix';
import { CellHighlight } from '../containers/FibonacciMatrix/models';

export type OnCellClick = (
  rowIndex: number,
  colIndex: number,
) => void;

export interface MatrixCellProps {
  rowIndex: number;
  colIndex: number;
  value: MatrixElement;
  highlight?: CellHighlight;
  onClick: OnCellClick;
}

export default memo(function MatrixCell({
  rowIndex,
  highlight,
  colIndex,
  value,
  onClick,
}: MatrixCellProps) {
  const onCellClick = useCallback(() => {
    onClick(rowIndex, colIndex);
  }, [rowIndex, colIndex, onClick]);

  const modifierClassName = !highlight
    ? ''
    : highlight === CellHighlight.Fibonacci
    ? '_fib'
    : '_change';


  return (
    <div
      className={`MatrixCell ${modifierClassName}`}
      onClick={onCellClick}
    >
      <span className="MatrixCell-text">
        {value || null}
      </span>
    </div>
  );
});
