import axios from 'axios'

// Vue.prototype.$axios = axios

// export default async ({ Vue }) => {
//   await Vue.prototype.$axios.get('statics/config.json').then(async ret => {
//     Vue.prototype.$configuracoes = ret.data
//   })
// }

export default async ({ Vue, store }) => {
  Vue.prototype.$axios = axios

  await Vue.prototype.$axios.get('statics/config.json').then(async ret => {
    Vue.prototype.$configuracoes = ret.data
  })
}
