export default function arraySetWithMutable<V>(
  index: number,
  operator: ArityOneFn<V>,
): (source: V[]) => V[] {
  return (source) => {
    const newValue = operator(source[index]);

    if (index < 0 || index >= source.length) {
      throw new RangeError(
        `Index ${index} is out of range for length ${source.length}.`,
        {
          cause: {
            source,
            newValue,
          },
        },
      );
    }

    source[index] = newValue;
    return source;
  };
}
