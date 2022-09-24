<template>
  <div id="nprogress">
    <div
      class="bar"
      role="bar"
      style="
        transform: translate3d(-0.6%, 0px, 0px);
        transition: all 200ms ease 0s;
      "
    >
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>
  </div>
</template>

<style scoped lang="scss">
#nprogress {
  height: 100vh;
}
</style>
