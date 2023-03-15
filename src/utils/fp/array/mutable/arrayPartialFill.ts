export default function arrayPartialFillMutable<V>(
  target: Array<V>,
  start: number,
  end: number,
  value: V,
): void {
  end = Math.min(end, target.length);

  for (let i = start; i < end; i++) {
    target[i] = value;
  }
}
