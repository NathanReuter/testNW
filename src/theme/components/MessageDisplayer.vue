<template>
    <div>
      <transition name="fade">
        <article class="message is-success" v-if="displaySuccessMsg">
          <div class="message-header">
            <b>{{ message }}</b>
            <button class="delete" @click="displaySuccessMsg = false" aria-label="delete"></button>
          </div>
        </article>
      </transition>
      <transition name="fade">
        <article class="message is-danger" v-if="displayErrorMsg">
          <div class="message-header">
            <b>{{ message }}</b>
            <button class="delete" @click="displayErrorMsg = false" aria-label="delete"></button>
          </div>
        </article>
      </transition>
    </div>
</template>

<script>
    import bus from '../../event-bus'

    export default {
      data () {
        return {
          message: '',
          displaySuccessMsg: false,
          displayErrorMsg: false,
          countDown: 3000
        }
      },
      methods: {
        setDisplaySuccessMsg (msg) {
          this.displaySuccessMsg = true
          this.message = msg
          this.hideMessages('displaySuccessMsg')
        },
        setDisplayErrorMsg (msg) {
          this.displayErrorMsg = true
          this.message = msg
          this.hideMessages('displayErrorMsg')
        },
        hideMessages (msg) {
          setTimeout(() => {
            this[msg] = false
            this.message = ''
          }, this.countDown)
        }
      },
      created () {
        bus.$on('display-success-message', msg => {
          this.setDisplaySuccessMsg(msg)
        })
        bus.$on('display-error-message', this.setDisplayErrorMsg)
      }
    }
</script>

<style scoped>
  article {
     margin: 20px 0;
  }
</style>
