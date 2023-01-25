<template>
  <div class="board">
    <div v-for="row in rows" :key="`row-${row}`" class="board__row">
      <Square
        v-for="column in columns" :key="`column-${column}${row}`"
        :column="column" :row="row"
        :square-click-events="squareClickEvents"
        @click="clickSquare"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SquareClickEvent } from '~~/types/Square';
import type { Ref, ComputedRef } from 'vue'

const squareClickEvents: Ref<Array<SquareClickEvent>> = ref([])
const columns: ComputedRef<Array<number>> = computed(() => getArray(8))
const rows: ComputedRef<Array<number>> = computed(() => getArray(8))

function getArray(lenght: number): Array<number> {
  return [...Array(lenght).keys()]
}
function resetClick(): void {
  squareClickEvents.value = []
}
function makeMove(): void {
  console.log(squareClickEvents.value.map(squareClickEvent => squareClickEvent.id))
}
function clickSquare(squareClickEvent: SquareClickEvent): void {
  if (squareClickEvents.value.length === 2) resetClick()
  squareClickEvents.value = [...squareClickEvents.value, squareClickEvent]
  if (squareClickEvents.value.length === 2) makeMove()
}
</script>

<style lang="scss">
.board {
  margin: 50px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column-reverse;
  &__row {
    flex: 1;
    display: flex;
  }
}
</style>
