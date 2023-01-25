<template>
  <div class="app">
    <Board />
  </div>
</template>

<style lang="scss">
:root {
  --white: rgb(231, 232, 245);
  --grey: rgb(140, 141, 168);
  --black: rgb(38, 39, 58);
  --primary: rgb(161, 17, 99);
  --primary-transparent: rgba(161, 17, 99, 0.2);
}
body {
  font-family: sans-serif;
  background: var(--grey);
}
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>