<template>
  <div class="dropdown" :class="{'is-active': this.activeDrop}">
    <div class="dropdown-trigger">
      <button class="button" @click="() => {this.activeDrop = !this.activeDrop}" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Ordenar</span>
        <font-awesome-icon class="icon is-small" icon="sort"/>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" v-for="item in items" class="dropdown-item"
           @click="callAction(item.action)">
          {{ item.value }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faSort } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(faSort)

  export default {
    props: ['items'],
    components: {
      'font-awesome-icon': FontAwesomeIcon
    },
    data () {
      return {
        activeDrop: false
      }
    },
    methods: {
      callAction (action) {
        this.activeDrop = false
        action()
      }
    }
  }
</script>
