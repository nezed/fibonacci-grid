import pipe from '../../function/pipe';
import arraySetMutable from '../mutable/arraySet';
import arrayCopy from './arrayCopy';

const arraySetImmutable = <V>(index: number, value: V) =>
  pipe(arrayCopy, arraySetMutable<V>(index, value));

export default arraySetImmutable;
