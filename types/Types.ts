export type Square = {
  id: string,
  column: number,
  row: number,
}
export type Piece = {
  square: Square
}
export type Move = {
  id: number,
  from: Square,
  to: Square
}