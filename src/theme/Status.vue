<template>
    <div>
      <h3 class="title">Pagina de Status</h3>
        <div class="card">
          <div class="card-content">
            <p><b>Uptime do Servidor:</b> <span data-server-uptime>{{ serverUptime }}</span></p>
            <p><b>Número de Requisições:</b> <span data-reqcount>{{ reqcount }}</span></p>
            <span class="is-italic">* O número de requisições inclui as requisições de páginas e arquivos estáticos</span>
          </div>
        </div>
    </div>
</template>

<script>
  import AppService from '../app.service'
  export default {
    data () {
      return {
        reqcount: 0,
        serverUptime: '00:00:00'
      }
    },
    methods: {
      loadData () {
        AppService.getServerStatus()
          .then(data => {
            this.reqcount = data.reqcount
            this.serverUptime = data.serverUptime
          })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
