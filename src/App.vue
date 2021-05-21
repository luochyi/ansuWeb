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
@import "@/style/layout.scss";
</style>

<style lang="scss">
@import "@/style/public.scss";

@font-face {
  font-family: 'iconfont';  /* Project id 2537314 */
  src: url('//at.alicdn.com/t/font_2537314_148ojc9z80m.woff2?t=1620613437918') format('woff2'),
       url('//at.alicdn.com/t/font_2537314_148ojc9z80m.woff?t=1620613437918') format('woff'),
       url('//at.alicdn.com/t/font_2537314_148ojc9z80m.ttf?t=1620613437918') format('truetype');
}

#app {
  text-align: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
