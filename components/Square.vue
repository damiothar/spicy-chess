<template>
  <button 
    class="square"
    :class="{'--black': isBlack, '--selected': isSelected}"
    @click.prevent="click"
  >
    {{ id }}
  </button>
</template>

<script setup lang="ts">
import type { SquareClickEvent } from '~~/types/Square';
import type { ComputedRef } from 'vue'

const props = defineProps<{
  column: number
  row: number
  squareClickEvents: Array<SquareClickEvent>
}>()
const id: ComputedRef<string> = computed(() => {
  const firstLetterIndex: number = 'a'.charCodeAt(0)
  const letter: string = String.fromCharCode(firstLetterIndex + props.column).toUpperCase()
  const number: number = props.row + 1
  return letter + number
})
const isBlack: ComputedRef<boolean> = computed(() => {
  return (props.column + props.row) % 2 == 0
})
const isSelected: ComputedRef<boolean> = computed(() => {
  return !!props.squareClickEvents.find(squareClickEvent => squareClickEvent.id === id.value)
})

const emits = defineEmits(['click'])
function click(): void {
  const squareClickEvent: SquareClickEvent = {
    column: props.column,
    row: props.row,
    id: id.value,
  }
  emits('click', squareClickEvent)
}
</script>

<style lang="scss">
.square {
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
      0 0 0 3px var(--background-color) inset,
      0 0 0 6px var(--primary) inset,
      0 0 0 9999px var(--primary-transparent) inset;
  }
}
</style>
