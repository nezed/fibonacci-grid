export default function arrayCopy<V>(source: Iterable<V>): Array<V> {
  return Array.isArray(source) ? source.slice() : Array.from(source);
}
