<template>
  <div id="app">
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <message-displayer></message-displayer>
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from './components/AppHeader.vue'
  import AppFooter from './components/AppFooter.vue'
  import MessageDisplayer from './components/MessageDisplayer.vue'

  export default {
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter,
      'message-displayer': MessageDisplayer
    }
  }
</script>
<style lang="scss">
  @import "style/globals";
  @import '~bulma';
  html, body, #app {
    height: 100%;
  }
  .main-section {
    padding-bottom: 9em;
    height: calc(100% - 152px);
    overflow-y: auto;
  }

  .columns{
    flex-wrap: wrap
  }
</style>
