<template>
  <q-page class="grad">
    {{ this.tableData }} {{ this.tableDataAll }}
  </q-page>
</template>

<script>
// import { QSpinnerGears } from 'quasar'
export default {
  name: 'Regiao',
  components: {
  },
  data () {
    return {
      dados: {
        periodo: {
          dataInicio: '09/04/2019',
          dataFim: '10/04/2019'
        }
      },
      tableData: [],
      tableDataAll: []
    }
  },
  created () {
    this.getLista()
    // this.getListaToda()
  },
  mounted () {
  },
  methods: {
    async getLista () {
      console.dir(this.dados)
      const ret = await this.$geralService.comunicaAsync('dados', 'post', this.dados, 'Consulta por periodo', true)
      if (ret !== {}) {
        this.tableData = ret
      } else {
        this.tableData = []
      }
    },
    async getListaToda () {
      const ret = await this.$geralService.comunicaAsync('dados/all', 'post', this.dados.periodo.dataInicio, 'Consulta toda a base', true)
      if (ret !== {}) {
        setTimeout(this.tableDataAll = ret, 2000)
      } else {
        this.tableDataAll = []
      }
    }
  }
}
</script>
<style>
.grad {
  background: linear-gradient(to right, #2F495E 20%, #333333 100%);
  background-color: #e2e8f0;
  color: #00ffd5;
}
.grad-invertido {
  background: linear-gradient(to left,#333333 0%,  #2F495E 50%);
}
</style>
