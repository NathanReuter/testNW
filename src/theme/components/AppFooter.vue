<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        Some 'beautiful' footer
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
  @import "../style/globals";

  footer {
    border-top: 5px solid $primary;
    color: white;
    background-color: $secondary !important;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 100px;
    padding: 20px;
  }
</style>
