<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        Todos os direitos <span class="line-through">não</span> reservados <br>
        <span class="easter-is-coming">Desenvolvido por Nathan Reuter Godinho</span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
  @import "../style/globals";

  .line-through {
    text-decoration: line-through;
  }
  .easter-is-coming {
    color: $secondary;
  }
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
