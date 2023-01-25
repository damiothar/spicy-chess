<template>
  <div class="board">
    <div v-for="row in rows" :key="`row-${row}`" class="board__row">
      <Square
        v-for="column in columns" :key="`square-${column}-${row}`"
        ref="squares"
        :column="column" :row="row"
        :tentative-move="tentativeMove"
        :piece="piece"
        @click="startMove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Square, Piece } from '~~/types/Types';
import type { Ref, ComputedRef } from 'vue'
const props = defineProps<{
  piece: Piece
}>()
const columns: Array<number> = getArray(8)
const rows: Array<number> = getArray(8)
const tentativeMove: Ref<Array<Square>> = ref([])
const step: ComputedRef<number> = computed(() => tentativeMove.value.length)

const emits = defineEmits(['make-move'])
function getArray(lenght: number): Array<number> {
  return [...Array(lenght).keys()]
}
function resetClick(): void {
  tentativeMove.value = []
}
function startMove(square: Square): void {
  const hasPiece = props.piece.square.id === square.id
  if (step.value === 2) {
    resetClick()
  }
  if (step.value === 0 && !hasPiece || step.value === 1 && hasPiece) {
    return
  }
  tentativeMove.value = [...tentativeMove.value, square]
  if (step.value === 2) emits('make-move', tentativeMove.value)
}
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
