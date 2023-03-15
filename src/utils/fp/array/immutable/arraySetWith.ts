import pipe from '../../function/pipe';
import arraySetWithMutable from '../mutable/arraySetWith';
import arrayCopy from './arrayCopy';

const arraySetWithImmutable = <V>(
  index: number,
  operator: ArityOneFn<V>,
) => pipe(arrayCopy, arraySetWithMutable<V>(index, operator));

export default arraySetWithImmutable;
