import { Matrix, MatrixElement } from '../../../models/Matrix';
import arraySetImmutable from '../../../utils/fp/array/immutable/arraySet';
import arraySetWithImmutable from '../../../utils/fp/array/immutable/arraySetWith';
import increment from '../../../utils/fp/math/increment';

/**
 * Not used, demonstration purpose only
 */
export function immutableMatrixIncrement<V extends MatrixElement>(
  rowIndex: number,
  colIndex: number,
): (source: Matrix<V>) => Matrix<V> {
  return (source) => {
    const sourceValue = source[rowIndex][colIndex] || 0;
    // Just a trick to make TS understand how to use exact overload return result.
    const newValue =
      typeof sourceValue === 'bigint'
        ? increment(sourceValue)
        : increment(sourceValue);

    const row = source[rowIndex];

    const newRow = arraySetImmutable<V>(colIndex, newValue as V)(row);

    return arraySetImmutable(rowIndex, newRow)(source);
  };
}

export function immutableMatrixIncrementBothAxis<
  V extends MatrixElement,
>(
  source: Matrix<V>,
  targetRowIndex: number,
  targetColIndex: number,
): Matrix<V> {
  const newMatrix = source.map((rowValues, rowIndex) => {
    if (rowIndex === targetRowIndex) {
      return rowValues.map((val) => increment(val, 1));
    } else {
      return arraySetWithImmutable<MatrixElement>(
        targetColIndex,
        increment,
      )(rowValues);
    }
  });

  return newMatrix as Matrix<V>;
}
