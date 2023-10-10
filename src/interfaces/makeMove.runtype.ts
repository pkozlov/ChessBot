import { Literal, Record, Union } from 'runtypes';

const Square = Union(
  Literal('a8'), Literal('b8'), Literal('c8'), Literal('d8'), Literal('e8'), Literal('f8'), Literal('g8'), Literal('h8'),
  Literal('a7'), Literal('b7'), Literal('c7'), Literal('d7'), Literal('e7'), Literal('f7'), Literal('g7'), Literal('h7'),
  Literal('a6'), Literal('b6'), Literal('c6'), Literal('d6'), Literal('e6'), Literal('f6'), Literal('g6'), Literal('h6'),
  Literal('a5'), Literal('b5'), Literal('c5'), Literal('d5'), Literal('e5'), Literal('f5'), Literal('g5'), Literal('h5'),
  Literal('a4'), Literal('b4'), Literal('c4'), Literal('d4'), Literal('e4'), Literal('f4'), Literal('g4'), Literal('h4'),
  Literal('a3'), Literal('b3'), Literal('c3'), Literal('d3'), Literal('e3'), Literal('f3'), Literal('g3'), Literal('h3'),
  Literal('a2'), Literal('b2'), Literal('c2'), Literal('d2'), Literal('e2'), Literal('f2'), Literal('g2'), Literal('h2'),
  Literal('a1'), Literal('b1'), Literal('c1'), Literal('d1'), Literal('e1'), Literal('f1'), Literal('g1'), Literal('h1'),
);

const MakeMove = Record({
  from: Square,
  to: Square
});

export default MakeMove;
