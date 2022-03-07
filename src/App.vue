<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
*{margin:0; padding: 0;}
html, body{ height: 100%;} /* 给html,body都设置高度100% */
#app{
  height: 100vh !important;
}
</style>


