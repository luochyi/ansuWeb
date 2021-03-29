<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
head,
body {
  padding: 0px;
  margin: 0px;
}
</style>

<style lang="scss" scoped>
@import "@/style/deep.scss";
</style>

<style lang="scss">
@import "@/style/public.scss";
@import "@/style/layout.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
