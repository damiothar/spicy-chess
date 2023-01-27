<template>
  <div class="piece">
    pawn
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{
//   piece: string
// }>()
// console.log(props)
</script>

<style lang="scss" scoped>
.piece {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--accent);
  color: var(--black);
  display: grid;
  place-items: center;
}
</style>