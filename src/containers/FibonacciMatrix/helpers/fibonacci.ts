import { MatrixElement } from '../../../models/Matrix';
import { StartsWith } from '../models';

export function isFibonacciOf3Downcast(
  a: MatrixElement,
  b: MatrixElement,
  c: MatrixElement,
): boolean {
  if (c) {
    return (a || 0) + (b || 0) === c;
  }

  return false;
}

export function isFibonacciDowncast(
  startsWith: StartsWith,
  ...elements: MatrixElement[]
): boolean {
  if (startsWith !== StartsWith.Any) {
    if ((elements[0] || 0) !== startsWith) {
      return false;
    }
  }

  // Avoid Zero-only sequences
  if (!elements[3]) {
    return false;
  }

  let i = 2;
  do {
    if (
      !isFibonacciOf3Downcast(
        elements[i - 2],
        elements[i - 1],
        elements[i],
      )
    ) {
      return false;
    }

    i += Math.max(Math.min(3, elements.length - 1 - i), 1);
  } while (i < elements.length);

  return true;
}
