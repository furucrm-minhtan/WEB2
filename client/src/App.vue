<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<style lang="css">
  @import './assets/css/plugins.css';
  @import './assets/css/style.css';
</style>
