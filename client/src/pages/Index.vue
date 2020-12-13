<template>
  <q-page class="grad">
    <div class="q-pa-md row items-start q-gutter-md">
    <Chart />
    <q-card class="my-card transparent">
      <q-card-section>
        <p> </p>
      </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script>
import Chart from 'components/Chart.vue'
export default {
  name: 'PageIndex',
  components: {
    Chart
  },
  data () {
    return {
      dados: {
        periodo: {
          dataInicio: '01/04/2019',
          dataFim: ''
        },
        temp: []
      },
      tableData: [],
      tableDataAll: []
    }
  },
  created () {
  },
  mounted () {
    this.getLista()
    // this.getListaToda()
  },
  methods: {
    async getLista () {
      // console.dir(this.dados)
      if (this.dados.periodo.dataFim === '') {
        this.dados.periodo.dataFim = this.dados.periodo.dataInicio
      }
      const ret = await this.$geralService.comunicaAsync('dados', 'post', this.dados, 'Consulta por periodo', true)
      console.log('Retorno : ')
      // console.log(ret)
      if (ret !== {}) {
        this.dados.temp = ret
        console.log(this.dados.temp)
      } else {
        this.dados.temp = []
      }
    },
    async getListaToda () {
      const ret = await this.$geralService.comunicaAsync('dados/all', 'get', this.dados.periodo.dataInicio, 'Consulta toda a base', true)
      if (ret !== {}) {
        setTimeout(this.dados.temp = ret, 2000)
      } else {
        this.dados.temp = []
      }
    }
  }
}
</script>
<style lang="scss" scope>
.grad{
  background: linear-gradient(to right, #2F495E 20%, #333333 100%);
  background-color: #e2e8f0;
  color: #00ffd5;
}
.grad-invertido{
  background: linear-gradient(to left,#333333 0%,  #2F495E 50%);
}
.my-card{
  width: 100%;
  max-width: 250px;
}
</style>
