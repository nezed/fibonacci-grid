import type { Matrix, MatrixElement } from '../../../models/Matrix';
import {
  isFibonacciDowncast,
  isFibonacciOf3Downcast,
} from './fibonacci';
import {
  CellHighlight,
  FibonacciDirection,
  StartsWith,
} from '../models';
import arrayPartialFillMutable from '../../../utils/fp/array/mutable/arrayPartialFill';

export function getDirectionedFibonacciMaskForSequence(
  startsWith: StartsWith,
  direction: FibonacciDirection.Downcast | FibonacciDirection.Upcast,
  sequence: MatrixElement[],
  targetMask: CellHighlight[],
  minLength = 5,
): CellHighlight[] {
  const isDowncast = direction === FibonacciDirection.Downcast;

  for (let i = minLength - 1; i < sequence.length; i++) {
    const isSequenceOf5 = isDowncast
      ? isFibonacciDowncast(
          startsWith,
          ...sequence.slice(i - minLength + 1, i + 1),
        )
      : isFibonacciDowncast(
          startsWith,
          ...sequence.slice(i - minLength + 1, i + 1).reverse(),
        );

    if (isSequenceOf5) {
      arrayPartialFillMutable(
        targetMask,
        i - minLength + 1,
        i + 1,
        CellHighlight.Fibonacci,
      );

      while (++i < sequence.length) {
        if (
          isDowncast &&
          !isFibonacciOf3Downcast(
            sequence[i - 2],
            sequence[i - 1],
            sequence[i],
          )
        ) {
          break;
        }

        if (
          !isDowncast &&
          !isFibonacciOf3Downcast(
            sequence[i],
            sequence[i - 1],
            sequence[i - 2],
          )
        ) {
          break;
        }

        targetMask[i] = CellHighlight.Fibonacci;
      }
    }
  }

  return targetMask;
}

export function getMaskForSequence(
  startsWith: StartsWith,
  direction: FibonacciDirection,
  sequence: MatrixElement[],
  minLength = 5,
  defaultValue = CellHighlight.None,
) {
  const mask = new Array(sequence.length).fill(defaultValue);
  const isDowncast =
    direction === FibonacciDirection.Downcast ||
    direction === FibonacciDirection.Any;
  const isUpcast =
    direction === FibonacciDirection.Upcast ||
    direction === FibonacciDirection.Any;

  if (isDowncast) {
    getDirectionedFibonacciMaskForSequence(
      startsWith,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );
  }

  if (isUpcast) {
    getDirectionedFibonacciMaskForSequence(
      startsWith,
      FibonacciDirection.Upcast,
      sequence,
      mask,
      minLength,
    );
  }

  return mask;
}

export interface CalculateHighlightMaskOptions {
  startsWith: StartsWith;
  direction: FibonacciDirection;
  sourceMatrix: Matrix<MatrixElement>;
  sourceHighlightMask: Matrix<CellHighlight>;
  change?: {
    rowIndex: number;
    colIndex: number;
  };
  minLength?: number;
}
export function calculateHighlightMask({
  startsWith,
  direction,
  sourceMatrix,
  sourceHighlightMask,
  change,
  minLength,
}: CalculateHighlightMaskOptions): Matrix<CellHighlight> {
  const newHighlightMask = sourceHighlightMask.map(
    (_rowValues, rowIndex) => {
      return getMaskForSequence(
        startsWith,
        direction,
        sourceMatrix[rowIndex],
        minLength,
        change && change.rowIndex === rowIndex
          ? CellHighlight.Changed
          : CellHighlight.None,
      );
    },
  );

  for (let i = 0; i < sourceMatrix[0].length; i++) {
    const verticalValues =
      change && change.colIndex === i
        ? new Array(sourceMatrix.length).fill(CellHighlight.Changed)
        : sourceMatrix.map((rowValues) => rowValues[i]);

    const verticalMask = getMaskForSequence(
      startsWith,
      direction,
      verticalValues,
      minLength,
      change && change.colIndex === i
        ? CellHighlight.Changed
        : CellHighlight.None,
    );

    verticalMask.forEach((value, rowIndex) => {
      const baseValue =
        change && change.colIndex === i
          ? CellHighlight.Changed
          : value;
      newHighlightMask[rowIndex][i] = Math.max(
        baseValue,
        newHighlightMask[rowIndex][i],
      );
    });
  }

  return newHighlightMask;
}

export function clearMatrixWithMask(
  sourceMatrix: Matrix<MatrixElement>,
  highlightMask: Matrix<CellHighlight>,
  clearBy = CellHighlight.Fibonacci,
) {
  return sourceMatrix.map((rowValues, rowIndex) =>
    rowValues.map((cellValue, colIndex) => {
      return highlightMask[rowIndex][colIndex] === clearBy
        ? 0
        : cellValue;
    }),
  );
}
