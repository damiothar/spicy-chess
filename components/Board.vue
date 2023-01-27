<template>
  <div class="board">
    <div v-for="row in rows" :key="`row-${row}`" class="board__row">
      <Square
        v-for="square in getSquaresFromRow(row)" :key="`square-${square.id}`"
        :square="square" @click="clickSquare"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Square, Move } from '~~/types/Types'
import { isEven } from '~/helpers/Helpers'

const props = defineProps<{
  lastMove: Move | null
}>()
const emits = defineEmits(['save-move'])

const rows: Array<number> = getArray(8)
const columns: Array<number> = getArray(8)
const squares: Ref<Array<Square>> = ref(getSquares())
let squareFrom: Square | null = null
let squareTo: Square | null = null
getSquares()

function getArray(lenght: number): Array<number> {
  return [...Array(lenght).keys()]
}
function getSquares(): Array<Square> {
  return rows.map(row => (columns.map(column => ({
    id: getId(column, row),
    column,
    row,
    black: isEven(column + row),
    selected: false,
    piece: 'pawn',
  })))).flat()
}
function getSquaresFromRow(row: number): Array<Square> {
  const start = row * columns.length
  const end = start + columns.length
  return squares.value.slice(start, end)
}
function getId(column: number, row: number) {
  const firstLetterIndex: number = 'a'.charCodeAt(0)
  const letter: string = String.fromCharCode(firstLetterIndex + column).toUpperCase()
  const number: number = row + 1
  return letter + number
}

function resetSquaresSelected(): void {
  squares.value = squares.value.map(square => ({...square, selected: false}))
}
function resetMove(): void {
  squareFrom = null
  squareTo = null
}
function makeMove():void {
  if (!squareFrom || !squareTo) return
  if (!getPawnLegalMove(squareFrom, squareTo)) {
    resetMove()
    resetSquaresSelected()
    return
  }
  squareTo.piece = squareFrom.piece
  squareFrom.piece = null
  const index = props.lastMove ? props.lastMove.index + 1 : 0
  const move: Move = { index, from: squareFrom.id, to: squareTo.id }
  emits('save-move', move)
  resetMove()
}
function clickSquare(id: string): void {
  if (!squareFrom) resetSquaresSelected()
  const square: Square | null = squares.value.find(square => square.id === id) || null
  if (!square) {
    resetMove()
    resetSquaresSelected()
    return
  }
  if (square.piece && !squareFrom) {
    squareFrom = square
    squareFrom.selected = true
    return
  }
  if (!square.piece && squareFrom) {
    squareTo = square
    squareTo.selected = true
    makeMove()
    return
  }
  resetMove()
  resetSquaresSelected()
}

function getPawnLegalMove(squareFrom: Square, squareTo: Square) {
  if (squareFrom.column !== squareTo.column) return false
  if (squareFrom.row > squareTo.row) return false
  return true
}

// function getPiece(column: number, row: number) {
//   console.log('getPiece')
// }

</script>

<style lang="scss">
.board {
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column-reverse;
  &__row {
    flex: 1;
    display: flex;
  }
}
</style>
