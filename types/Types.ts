export type Square = {
  id: string,
  column: number,
  row: number,
  black: boolean,
  selected: boolean,
  piece: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | null,
}

export type Move = {
  index: number,
  from: string,
  to: string,
}