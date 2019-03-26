<template>
  <div>
    <form v-on:submit.prevent="validateCertification">
      <div class="columns">
        <div class="column is-four-fifths">
          <div class="field">
            <div class="control">
              <the-mask
                class="input"
                v-if="type === 'cpf'"
                name="certificade-input"
                type="text"
                mask="###.###.###-##"
                v-model="newCertification"
                :placeholder="`Digite o ${type}`"/>
              <the-mask
                class="input"
                v-else
                name="certificade-input"
                type="text"
                mask="##.###.###/####-##"
                v-model="newCertification"
                :placeholder="`Digite o ${type}`"/>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <button class="button is-primary">Validar</button>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TheMask } from 'vue-the-mask'
  import bus from '../event-bus'

  export default {
    components: {
      TheMask
    },
    data () {
      return {
        newCertification: ''
      }
    },
    computed: {
      ...mapGetters(['type'])
    },
    watch: {
      '$route' (to, from) {
        this.newCertification = ''
      }
    },
    methods: {
      validateCertification () {
        this.$store.dispatch('addCertification',
          {type: this.type, value: this.newCertification, blacklisted: false})
          .then(this.callDisplaySuccessMsg)
          .catch(this.callDisplayErrorMsg)
      },
      callDisplaySuccessMsg () {
        bus.$emit('display-success-message', `${this.type.toUpperCase()} é válido!`)
      },
      callDisplayErrorMsg () {
        bus.$emit('display-error-message', `${this.type.toUpperCase()} é inválido!`)
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    opacity: 0;
  }
</style>
