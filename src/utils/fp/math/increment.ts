/**
 * @param a Usage of 'number' will lead to IEEE 754 based calculations.
 *
 * Use `bigint` or `string` to enforce 'bigint' math.
 *
 * `void` and `null` considered as `0`, so the `by` value is returned.
 * @param by **WARNING:** Please set to `1n` when empty values takes place for bigint.
 */
export default function increment(
  a?: number | null | undefined,
  by?: number,
): number;

/**
 * @param a `bigint` will use 'bigint' math only.
 * No 'Number', FR. (aka Double, Float64, IEEE 754)
 *
 * Usage of 'number' will lead to IEEE 754 based calculations.
 *
 * `void` and `null` considered as `0n`, so the `by` value is returned.
 * @param by **WARNING:** Please set to `1n` when empty values takes place for bigint.
 */
export default function increment(
  a?: bigint | string | null | undefined,
  by?: bigint,
): bigint;

export default function increment(
  a: any,
  by: any = 1,
): number | bigint {
  if (typeof a === 'number') {
    return Number(a) + Number(by || 1);
  }

  if (typeof a === 'string' || typeof a === 'bigint') {
    return BigInt(a) + BigInt(by || 1);
  }

  return by || 1;
}
