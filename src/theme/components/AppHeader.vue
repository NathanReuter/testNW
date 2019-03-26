<template>
  <nav class="nav has-shadow">
    <div class="container">
      <router-link to="/" exact>
        <span class="icon is-large logo-icon">
          <font-awesome-icon class="is-large" icon="check-double"></font-awesome-icon>
        </span>
      </router-link>
      <router-link class="nav-item is-tab"
                   exact
                   :to="{ name: 'certification', params: { id: 'cpf' } }">CPF</router-link>
      <router-link class="nav-item is-tab"
                   exact
                   :to="{ name: 'certification', params: { id: 'cnpj' } }">CNPJ</router-link>
      <router-link class="nav-item is-tab"
                   exact
                   :to="{name: 'status'}">
        <span>Status do Servidor</span>
      </router-link>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add([faCheckDouble])

  export default {
    components: {
      'font-awesome-icon': FontAwesomeIcon
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
<style scoped lang="scss">
  .logo-icon {
    margin-top: 5px;
  }
  .is-large {
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
</style>
