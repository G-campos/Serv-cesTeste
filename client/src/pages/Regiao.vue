<template>
  <q-page class="grad container">
    <!-- div principal -->
    <div class="row justify-center">
      <!-- primeira linha -->
      <div class="col-12 col-md-6 col-sm-12 row q-ga-md justify-around">
        <!-- colunas -->
        <div class="col-4 col-md-5 transparent my-card">
          <q-input filled v-model="dados.periodo.dataInicio" :rules="['dados.periodo.dataInicio']" label="Data de inicio" stack-label class="my-input">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="dados.periodo.dataInicio" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <q-input v-model="dados.periodo.dataInicio" label="Data de inicio" stack-label type="date" class="my-input"/> -->
        </div>
        <div class="col-4 col-md-5 transparent my-card">
          <q-input filled v-model="dados.periodo.dataFim" :rules="['dados.periodo.dataFim']" label="Data de inicio" stack-label class="my-input">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="dados.periodo.dataFim" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="my-color" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <q-input v-model="dados.periodo.dataFim" label="Data de fim" stack-label type="date" class="my-input"/> -->
        </div>
      </div>
    </div>
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
          dataInicio: '01/04/2019',
          dataFim: ''
        },
        temp: [],
        horas: null,
        valores: null,
        coluna: {
          estados: []
        }
      },
      tableData: [],
      tableDataAll: [],
      loading: false,
      percentage: 0,
      click: 0
    }
  },
  created () {
    this.getLista()
    // this.getListaToda()
  },
  mounted () {
  },
  methods: {
    getDados () {
      this.loading = true
      this.click += 1
      if (this.click < 2) {
        if (this.dados.periodo.dataInicio === '') {
          this.loading = false
          this.getListaToda()
        } else {
          this.getLista()
          if (this.dados.temp) {
            this.loading = false
          }
        }
      } else {
        this.dados.horas = null
        this.dados.valores = null
        this.click = 0
        this.loading = false
        this.getDados()
      }
    },
    async getLista () {
      console.dir(this.dados)
      if (this.dados.periodo.dataFim === '') {
        this.dados.periodo.dataFim = this.dados.periodo.dataInicio
      }
      const ret = await this.$geralService.comunicaAsync('dados', 'post', this.dados, 'Consulta por periodo', true)
      console.log('Retorno : ')
      console.log(ret)
      if (ret !== {}) {
        this.dados.temp = ret
        this.calculo(this.dados.temp)
      }
    },
    async getListaToda () {
      const ret = await this.$geralService.comunicaAsync('dados/all', 'get', this.dados.periodo.dataInicio, 'Consulta toda a base', true)
      if (ret !== {}) {
        setTimeout(this.dados.temp = ret, 1000)
        this.calculo(this.dados.temp)
      }
    },
    calculo (entrada) {
      for (const item of entrada) {
        // console.log(item)
        this.dados.valores += item.VALOR

        for (const estado of item.ESTADO) {
          for (const estados of this.dados.coluna.estados) {
            if (estados !== estado) {
              this.dados.coluna.estados.push(estado)
              console.log(this.dados.conula.estados)
            }
          }
        }

        for (const horas of item.HORA) {
          this.dados.horas = horas
        }
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
