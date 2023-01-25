<template>
  <button 
    class="square"
    :class="{'--black': isBlack, '--selected': isSelected}"
    @click.prevent="click"
  >
    <div v-if="hasPiece" class="piece" />
    <div class="square__id">
      {{ square.id }}
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Piece, Square } from '~~/types/Types';
import type { ComputedRef } from 'vue'

const props = defineProps<{
  column: number
  row: number
  tentativeMove: Array<Square>,
  piece: Piece
}>()
const square: Square = {
  id: getId(),
  column: props.column,
  row: props.row,
}
const isBlack: boolean = (props.column + props.row) % 2 == 0
const isSelected: ComputedRef<boolean> = computed(() => {
  return !!props.tentativeMove.find(event => event.id === square.id)
})
const hasPiece: ComputedRef<boolean> = computed(() => {
  return props.piece.square.id === square.id
})

const emits = defineEmits(['click'])
function getId(): string {
  const firstLetterIndex: number = 'a'.charCodeAt(0)
  const letter: string = String.fromCharCode(firstLetterIndex + props.column).toUpperCase()
  const number: number = props.row + 1
  return letter + number
}
function click(): void {
  emits('click', square)
}
</script>

<style lang="scss">
.square {
  position: relative;
  letter-spacing: 2px;
  display: block;
  aspect-ratio: 1/1;
  padding: 0;
  border: none;
  cursor: pointer;
  --background-color: var(--white);
  --color: var(--black);
  background-color: var(--background-color);
  color:  var(--color);
  &.--black {
    --background-color: var(--black);
    --color: var(--white);
  }
  &.--selected {
    box-shadow: 
      0 0 0 2px var(--background-color) inset,
      0 0 0 4px var(--primary) inset;
  }
  &__id {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.piece {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: var(--accent);
}
</style>
