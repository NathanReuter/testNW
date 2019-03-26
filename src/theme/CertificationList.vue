<template>
  <div class="panel">
    <div class="panel-block">
      <div class="columns filter-section">
        <div class="column is-four-fifths">
          <p class="control has-icons-left">
            <input class="input is-small" v-model="findCert" type="text" placeholder="Filtrar">
            <span class="icon is-small is-left">
            <font-awesome-icon icon="search" />
          </span>
          </p>
        </div>
        <div class="column">
          <dropdown
            :items="[
                {value: 'Ascendente', action: () => this.setSort('asc')},
                {value: 'Descendente', action: () => this.setSort('dsc')}
                ]
              ">
          </dropdown>
          <label class="checkbox">
            <input type="checkbox" v-model="filterblack">
            Filtrar blacklist
          </label>
        </div>
      </div>
    </div>

    <div v-for="cert in filteredCertifications">
      <div class="panel-block" @click="selectCert(cert)"
           :class="{selected: cert.value === selected.value}">
        <a class="level-item"  :class="{disabled: cert.blacklisted}" >
          {{ certMask(cert.value, cert.type) }}
        </a>
      </div>
    </div>
    <div class="panel-block" v-if="selected.value">
      <button @click="removeCertification" class="button is-danger is-outlined ">
        Remover
      </button>
      <button @click="setBlackList" class="button is-dark is-outlined ">
        {{ selected.blacklisted ? 'UnBlacklist' : 'Blacklist'}}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Dropdown from './components/Dropdown.vue'

  library.add([faSearch])
  export default {
    components: {
      'font-awesome-icon': FontAwesomeIcon,
      'dropdown': Dropdown
    },
    data () {
      return {
        selected: {},
        findCert: '',
        sort: 'asc',
        filterblack: false
      }
    },
    computed: {
      ...mapGetters(['type', 'certifications']),
      filteredCertifications () {
        let filter = new RegExp(this.findCert, 'i')
        let newCert = this.filterblack
          ? this.certifications.filter(el => el.blacklisted) : this.certifications

        newCert = newCert
          .filter(el => el.value.match(filter))
          .sort()

        return this.sort === 'asc' ? newCert : newCert.reverse()
      }
    },
    watch: {
      '$route' (to, from) {
        this.loadCertifications()
      }

    },
    methods: {
      updateCertifications (type) {
        this.certifications = this[type]
      },
      loadCertifications () {
        /* Fetch the certifications from the server by its type */
        let type = this.$route.params.id
        this.$store.dispatch('setType', type)
        this.selected = {}
        this.$store.dispatch('loadCertifications', type)
      },
      removeCertification () {
        this.$store.dispatch('removeCertification', this.selected._id)
      },
      setBlackList () {
        this.$store.dispatch('setBlackList', { id: this.selected._id, updates: {blacklisted: !this.selected.blacklisted} })
      },
      selectCert (cert) {
        /* Compare the selected object with the stored one
        * and Unselect if is equal */

        if (JSON.stringify(this.selected) === JSON.stringify(cert)) {
          this.selected = {}
        } else {
          this.selected = cert
        }
      },
      setSort (order) {
        this.sort = order
      },
      /* eslint-disable */
      certMask (value, type) {
        return type === 'cpf'
          ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4')
          : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5')
      }
      /* eslint-enable */
    },
    created () {
      this.loadCertifications()
    }
  }
</script>

<style scoped lang="scss">
  .panel {
    margin-top: 30px;
  }

  .disabled {
    text-decoration: line-through;
    color: #adadad;
  }

  .selected {
    background: #acd5f9 !important;
  }

  .panel-block {
    cursor: pointer;

  &:hover {
     background: aliceblue;
   }

  button {
    margin-right: 5px;
  }

  .filter-section {
    width: 100%;
  }
  }

  .checkbox {
    padding-top: 10px;
    margin-left: 20px;
  }
</style>
