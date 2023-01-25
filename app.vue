<template>
  <div class="app">
    <div class="app__main">
      <Board :last-move="lastMove" @make-move="makeMove" />
    </div>
    <div class="app__aside">
      <div v-for="move in moves" :key="move.index" class="move">
        {{ move.index + 1 }}. {{ move.from }} > {{ move.to }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import type { Move } from '~~/types/Types'

const moves: Ref<Array<Move>> = ref([])
const lastMove: ComputedRef<Move | undefined> = computed(() => moves.value.at(-1))
  
function makeMove(move: Move): void {
  moves.value.push(move)
}
</script>

<style lang="scss">
:root {
  --white: rgb(231, 232, 245);
  --grey: rgb(140, 141, 168);
  --black: rgb(38, 39, 58);
  --primary: rgba(255, 0, 144, 0.8);
  --accent: rgb(255, 85, 0);
}
body {
  font-family: sans-serif;
  background: var(--grey);
}
.app {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-areas: 'main aside';
  &__main {
    grid-area: main;
    padding: 50px;
  }
  &__aside {
    grid-area: aside;
    background-color: var(--white);
    padding: 50px 20px;
    overflow-y: auto;
  }
}

.move {
  margin-bottom: 20px;
}
</style>