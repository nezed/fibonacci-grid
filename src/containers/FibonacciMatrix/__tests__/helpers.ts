import { isFibonacciDowncast } from '../helpers/fibonacci';
import {
  getDirectionedFibonacciMaskForSequence,
  getMaskForSequence,
} from '../helpers/masks';
import {
  CellHighlight,
  FibonacciDirection,
  StartsWith,
} from '../models';

const fibonacciSeq = ((n) => {
  for (var fibonacci = [0, 1], i = 2; i < n; i++)
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);

  return fibonacci;
})(50);

describe('isFibonacciDowncast', () => {
  it('starts with: Zero', () => {
    // Lack of AAA-tests
    expect(
      isFibonacciDowncast(
        StartsWith.Zero,
        ...fibonacciSeq.slice(0, 5),
      ),
    ).toBeTruthy();
    expect(
      isFibonacciDowncast(
        StartsWith.Zero,
        ...fibonacciSeq.slice(1, 6),
      ),
    ).toBeFalsy();
    expect(
      isFibonacciDowncast(
        StartsWith.Zero,
        ...fibonacciSeq.slice(10, 15),
      ),
    ).toBeFalsy();
    expect(
      isFibonacciDowncast(
        StartsWith.Zero,
        ...fibonacciSeq.slice(45, 50),
      ),
    ).toBeFalsy();
  });

  it('starts with: One', () => {
    expect(
      isFibonacciDowncast(
        StartsWith.One,
        ...fibonacciSeq.slice(0, 5),
      ),
    ).toBeFalsy();
    expect(
      isFibonacciDowncast(
        StartsWith.One,
        ...fibonacciSeq.slice(1, 6),
      ),
    ).toBeTruthy();
    expect(
      isFibonacciDowncast(
        StartsWith.One,
        ...fibonacciSeq.slice(10, 15),
      ),
    ).toBeFalsy();
    expect(
      isFibonacciDowncast(
        StartsWith.One,
        ...fibonacciSeq.slice(45, 50),
      ),
    ).toBeFalsy();
  });

  it('starts with: Any', () => {
    expect(
      isFibonacciDowncast(
        StartsWith.Any,
        ...fibonacciSeq.slice(0, 5),
      ),
    ).toBeTruthy();
    expect(
      isFibonacciDowncast(
        StartsWith.Any,
        ...fibonacciSeq.slice(1, 6),
      ),
    ).toBeTruthy();
    expect(
      isFibonacciDowncast(
        StartsWith.Any,
        ...fibonacciSeq.slice(10, 15),
      ),
    ).toBeTruthy();
    expect(
      isFibonacciDowncast(
        StartsWith.Any,
        ...fibonacciSeq.slice(45, 50),
      ),
    ).toBeTruthy();
  });
});

describe('getDirectionedFibonacciMaskForSequence', () => {
  const minLength = 5;

  it('starts with fib seq', () => {
    // Arrange
    const sequence = [
      ...fibonacciSeq.slice(0, minLength + 1),
      0,
      1,
      1,
      2,
    ];
    const mask = new Array(sequence.length).fill(
      CellHighlight.Changed,
    );

    // Act
    getDirectionedFibonacciMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Changed,
    ]);
  });

  it('have fib subseq', () => {
    // Arrange
    const sequence = [
      0,
      0,
      1,
      ...fibonacciSeq.slice(0, minLength + 1),
      0,
      0,
    ];
    const mask = new Array(sequence.length).fill(
      CellHighlight.Changed,
    );

    // Act
    getDirectionedFibonacciMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Changed,
      CellHighlight.Changed,
    ]);
  });

  it('ends with fib seq', () => {
    // Arrange
    const sequence = [
      0,
      1,
      1,
      2,
      ...fibonacciSeq.slice(0, minLength + 1),
    ];
    const mask = new Array(sequence.length).fill(
      CellHighlight.Changed,
    );

    // Act
    getDirectionedFibonacciMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Changed,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
    ]);
  });

  it('starts and ends with fib seq', () => {
    // Arrange
    const sequence = [
      0,
      1,
      1,
      2,
      3,
      ...fibonacciSeq.slice(0, minLength + 1),
    ];
    const mask = new Array(sequence.length).fill(
      CellHighlight.Changed,
    );

    // Act
    getDirectionedFibonacciMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
    ]);
  });

  it('starts and ends with fib seq with gap', () => {
    // Arrange
    const sequence = [
      0,
      1,
      1,
      2,
      3,
      5,
      0,
      ...fibonacciSeq.slice(0, minLength + 1),
    ];
    const mask = new Array(sequence.length).fill(
      CellHighlight.Changed,
    );

    // Act
    getDirectionedFibonacciMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Downcast,
      sequence,
      mask,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Changed,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
    ]);
  });

  it('contains fib seq in both directions', () => {
    // Arrange
    const sequence = [
      ...fibonacciSeq.slice(0, minLength + 1),
      ...fibonacciSeq.slice(0, minLength).reverse(),
    ];

    // Act
    const mask = getMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Any,
      sequence,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
    ]);
  });

  it('contains fib seq in both directions with gap', () => {
    // Arrange
    const sequence = [
      ...fibonacciSeq.slice(0, minLength + 1),
      0,
      1,
      ...fibonacciSeq.slice(0, minLength).reverse(),
    ];

    // Act
    const mask = getMaskForSequence(
      StartsWith.Zero,
      FibonacciDirection.Any,
      sequence,
      minLength,
    );

    // Assert
    expect(mask).toEqual([
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.None,
      CellHighlight.None,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
      CellHighlight.Fibonacci,
    ]);
  });
});
