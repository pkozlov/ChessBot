import { Literal, Record, Union } from 'runtypes';

const Side = Union(
  Literal('white'),
  Literal('black'),
  Literal('random'),
);

const CreateGame = Record({
  side: Side,
});

export default CreateGame;
