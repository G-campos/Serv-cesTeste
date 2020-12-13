// eslint-disable-next-line
import Vue from 'vue'
import Storage from '../services/storage'
import {
  date,
  QSpinnerGears
} from 'quasar'
import moment from 'moment'
moment.locale('pt-BR')
import router from '../router'

export default ({
  Vue
}) => {
  const storage = new Storage()

  Vue.config.keyCodes.f2 = 113

  const geralService = {
    removeCaracteresEspeciais (str) {
      // eslint-disable-next-line no-useless-escape
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
        // eslint-disable-next-line no-useless-escape
        .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
        .replace(/(^-+|-+$)/, '').toLowerCase() // Remove hífens extras do final ou do inicio da string
    },
    removerAcentos (s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '')
    },
    irPara (rota) {
      router.push(rota)
    },
    getListaTree (agrupador, getProduto) {
      const objTree = []
      if (agrupador.categorias.length > 0) {
        const categoria = agrupador.categorias[0]
        for (let index2 = 0; index2 < categoria.familias.length; index2++) {
          const familia = categoria.familias[index2]
          objTree.push(this.getStruturaFamilia(familia, 0, agrupador, undefined, getProduto))
        }
      }
      return objTree
    },
    getLista: function (lista, value, label, filtro, retornoValueLabel) {
      const newLista = []
      const filtroKeys = filtro !== undefined ? Object.keys(filtro) : []
      for (let index = 0; index < lista.length; index++) {
        const element = lista[index]
        let continua = true
        for (let index2 = 0; index2 < filtroKeys.length; index2++) {
          if (element[filtroKeys[index2]] !== filtro[filtroKeys[index2]]) {
            continua = false
            break
          }
        }
        if (continua) {
          let v = ''
          if (value === 'obj') {
            v = element
          } else if (value === '__lista') {
            v = {
              id: element.id,
              descricao: element.descricao
            }
          } else {
            v = element[value]
          }
          if (retornoValueLabel === undefined || retornoValueLabel === null || retornoValueLabel === false || retornoValueLabel === '') {
            newLista.push({
              value: v,
              label: element[label]
            })
          } else if (retornoValueLabel === true) {
            newLista.push({
              value: v,
              label: v + ' - ' + element[label]
            })
          } else {
            newLista.push({
              value: v,
              label: element[retornoValueLabel] + ' - ' + element[label]
            })
          }
        }
      }
      return newLista
    },
    comunica (url, tipoRequisicao, data, callBackSucesso, acao, callBackInvalido, callBackErro, notifyPosition) {
      const configAxios = {
        method: tipoRequisicao,
        url: Vue.prototype.$configuracoes.BASE_REST + url
      }
      if (data) {
        configAxios.data = data
      }
      Vue.prototype.$axios(configAxios)
        .then(response => {
          if (response.status === 200) {
            if (response.data.valido) {
              if (callBackSucesso) {
                callBackSucesso(response.data.data)
              } else {
                Vue.prototype.$q.loading.hide()
              }
            } else {
              if (callBackInvalido) {
                callBackInvalido(response.data)
              } else {
                Vue.prototype.$q.notify({
                  position: notifyPosition || 'top',
                  color: 'warning',
                  message: 'Falha ' + ((acao !== undefined) ? ('ao ' + acao) : ' na ação') + '. ' + response.data.data.message,
                  icon: 'warning'
                })
                Vue.prototype.$q.loading.hide()
              }
            }
          } else {
            if (callBackErro) {
              callBackErro({
                message: response.statusText
              })
            } else {
              Vue.prototype.$q.loading.hide()
              Vue.prototype.$q.notify({
                position: notifyPosition || 'top',
                color: 'negative',
                message: 'Falha ao obter a resposta do servidor! ' + response.statusText,
                icon: 'warning'
              })
            }
          }
        })
        .catch(error => {
          console.error(error)
          if (callBackErro) {
            callBackErro(error)
          } else {
            Vue.prototype.$q.loading.hide()
            Vue.prototype.$q.notify({
              position: notifyPosition || 'top',
              color: 'negative',
              message: 'Falha de comunicação!' + (error && error.message) ? error.message : '',
              icon: 'warning'
            })
          }
        })
    },
    async comunicaAsync (url, tipoRequisicao, data, acao, loading, notifyPosition, callBackInvalido, callBackErro) {
      if (loading) {
        Vue.prototype.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'white',
          spinnerSize: 140,
          message: 'Processando. ' + (acao || '') + '... Aguarde!',
          messageColor: 'white'
        })
      }

      const configAxios = {
        method: tipoRequisicao,
        url: Vue.prototype.$configuracoes.BASE_REST + url,
        data: {}
      }
      if (data) {
        configAxios.data = data
        // console.dir(configAxios)
      };
      let retorno
      let response
      try {
        response = await Vue.prototype.$axios(configAxios)
        // console.log('response: ')
        // console.log(response)
        if (response.status === 200) {
          if (response.data !== []) {
            // console.log(response.data + ' 1')
            Vue.prototype.$q.loading.hide()
            return response.data
          } else {
            // console.log(response.data + ' 2')
            Vue.prototype.$q.notify({
              position: notifyPosition || 'top',
              color: 'warning',
              message: 'Falha ' + ((acao !== undefined) ? ('ao ' + acao) : ' na ação') + '. ' + (response.data.message ? response.data.message : (response.data.errmsg ? response.data.errmsg : '')),
              icon: 'warning'
            })
            Vue.prototype.$q.loading.hide()
            return response.data
          }
        } else {
          if (callBackErro) {
            await callBackErro({
              message: response.message
            })
          } else {
            Vue.prototype.$q.loading.hide()
            Vue.prototype.$q.notify({
              position: notifyPosition || 'top',
              color: 'negative',
              message: 'Falha ao obter a resposta do servidor! ' + response.statusText,
              icon: 'warning'
            })
          }
          retorno = {
            valido: false,
            data: {
              message: 'Falha ao obter a resposta do servidor! ' + response.statusText
            }
          }
        }
      } catch (error) {
        // console.log(error)
        if (callBackErro) {
          await callBackErro(error)
        } else {
          if (error.response && error.response.data && error.response.data.data && error.response.data.data.message) {
            Vue.prototype.$q.notify({
              color: 'negative',
              message: error.response.data.data.message,
              icon: 'warning'
            })
          } else {
            Vue.prototype.$q.loading.hide()
            Vue.prototype.$q.notify({
              position: notifyPosition || 'top',
              color: 'negative',
              message: 'Falha de comunicação!' + (error && error.message) ? error.message : '',
              icon: 'warning'
            })
          }
        }
        retorno = {
          valido: false,
          data: {
            message: 'Falha de comunicação!' + (error && error.message) ? error.message : ''
          }
        }
      };

      if (loading) {
        Vue.prototype.$q.loading.hide()
      }

      return retorno
    },
    getRandomName () {
      return (
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      )
    },
    getDataFormatada (dt, formato) {
      if (formato) {
        return date.formatDate(dt, formato)
      } else {
        return date.formatDate(dt, 'DD/MM/YYYY')
      }
    },
    getDataHoraFormatada (dt) {
      return date.formatDate(dt, 'DD/MM/YYYY HH:mm')
    },
    arredonda (valor, casas) {
      return parseFloat(valor.toFixed(casas))
    },
    /**
     * Get the number of days in any particular month
     * @link https://stackoverflow.com/a/1433119/1293256
     * @param  {integer} m The month (valid: 0-11)
     * @param  {integer} y The year
     * @return {integer}   The number of days in the month
     */
    daysInMonth (m, y) {
      switch (m) {
        case 1:
          return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28
        case 8:
        case 3:
        case 5:
        case 10:
          return 30
        default:
          return 31
      }
    },
    /**
     * Check if a date is valid
     * @link https://stackoverflow.com/a/1433119/1293256
     * @param  {[type]}  d The day
     * @param  {[type]}  m The month
     * @param  {[type]}  y The year
     * @var {Number} hg Exemplo Soma o tal do não sei o que
     * @return {Boolean}   Returns true if valid
     */
    isValidDate (d, m, y) {
      // console.logd + '/' + m + '/' + y);
      m = parseInt(m, 10) - 1
      return m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y)
    },
    /**
     * Check if a date is valid
     * @link https://stackoverflow.com/a/1433119/1293256
     * @param  {[type]}  strDate The date in format Quasar "YYYY/MM/DD"
     * @param  {[type]}  m The month
     * @param  {[type]}  y The year
     * @return {Boolean}   Returns true if valid
     */
    isValidDateYMD (strDate) {
      if (strDate !== undefined && strDate.length < 10) {
        return false
      } else {
        // console.logstrDate);
        return this.isValidDate(strDate.substr(8, 2), strDate.substr(5, 2), strDate.substr(0, 4))
      }
    },
    truncarValor (value, n) {
      // forço o fixed com 6 para arredondamento com algoritimo owerflow
      // como quase 100 % do truncamento é com 4 casas decimais, eu forço o arredondamento com 6 para pegar o truncamento mais proximo
      // foi até então o melhor até momento sem erros nos testes realizados
      const v = value.toFixed(6).toString().split('.')
      if (n <= 0) return v[0]
      let f = v[1] || ''
      if (f.length > n) return parseFloat(`${v[0]}.${f.substr(0, n)}`)
      while (f.length < n) f += '0'
      return parseFloat(`${v[0]}.${f}`)
    }
  }

  Vue.prototype.$geralService = geralService
  Vue.prototype.$indexDB = storage
}
