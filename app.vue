<template>
  <div class="app">
    <div class="app__main">
      <Board :piece="piece" @make-move="makeMove" />
    </div>
    <div class="app__aside">
      <div v-for="move in moves" :key="move.id" class="move">
        {{ move }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Square, Piece, Move } from '~~/types/Types';
import type { Ref } from 'vue'

const piece: Ref<Piece> = ref({ square: { column: 0, row: 0, id: 'A1' } })
const moves: Ref<Array<Move>> = ref([])
  
let count = 0
function makeMove(squares: Array<Square>): void {
  const {column, row, id} = squares[1]
  piece.value.square = {column, row, id}
  const move: Move = {
    id: count,
    from: squares[0],
    to: squares[1]
  }
  moves.value = [...moves.value, move]
  count++
}
</script>

<style lang="scss">
:root {
  --white: rgb(231, 232, 245);
  --grey: rgb(140, 141, 168);
  --black: rgb(38, 39, 58);
  --primary: rgba(255, 0, 144, 0.8);
  --accent: rgba(0, 255, 204, 0.8);
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
  }
}

.move {
  margin-bottom: 20px;
}
</style>