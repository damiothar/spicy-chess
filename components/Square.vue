<template>
  <button 
    class="square"
    :class="{'--black': square.black, '--selected': square.selected}"
    @click.prevent="click"
  >
    {{ square.id }}
    <div v-if="square.piece" class="piece">
      {{ square.piece }}
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Square } from '~~/types/Types';

const props = defineProps<{
  square: Square
}>()

const emits = defineEmits(['click'])
function click(): void {
  emits('click', props.square.id)
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
}
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
