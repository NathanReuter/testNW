<template>
  <div class="content">
    <h3 class="title">
      Validador de {{ type.toUpperCase() }}
    </h3>
    <certification-input></certification-input>
    <certification-list></certification-list>
  </div>
</template>

<script>
  import CertificationInput from './CertificationInput.vue'
  import CertificationList from './CertificationList.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      'certification-input': CertificationInput,
      'certification-list': CertificationList
    },
    computed: {
      ...mapGetters(['type'])
    }
  }
</script>
