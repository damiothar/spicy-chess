export type Square = {
  id: string,
  column: number,
  row: number,
  black: boolean,
  selected: boolean,
  piece: string | null,
}

export type Move = {
  index: number,
  from: string,
  to: string,
}