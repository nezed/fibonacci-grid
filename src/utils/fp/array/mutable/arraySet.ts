export default function arraySetMutable<V>(
  index: number,
  value: V,
): (source: V[]) => V[] {
  return (source) => {
    if (index < 0 || index >= source.length) {
      throw new RangeError(
        `Index ${index} is out of range for length ${source.length}.`,
        {
          cause: {
            source,
            newValue: value,
          },
        },
      );
    }

    source[index] = value;
    return source;
  };
}
