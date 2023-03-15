export default function pipe<T>(...fns: ArityOneFn<T>[]) {
  return (p: T) =>
    fns.reduce((acc: T, cur: ArityOneFn<T>) => cur(acc), p);
}
