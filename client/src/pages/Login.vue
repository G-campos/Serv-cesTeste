<template>
  <q-layout view="hHh LpR lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-gutter-md">
          <q-form @submit="logar">
            <q-input
              class="q-pb-md"
              v-model="email"
              rounded
              outlined
              type="email"
              label="Email"
              autofocus
            />
            <q-input
              v-model="password"
              rounded
              outlined
              :type="isPwd ? 'password' : 'text'"
              label="Senha"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row justify-center q-pt-md">
              <q-btn
                rounded
                label="Entrar"
                type="submit"
                color="primary"
                v-close-popup
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import HTTPClient from '../boot/axios'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true
    }
  },
  created () {
    console.log(HTTPClient)
  },
  computed: {
    ...mapState('authentication', [
      'registerEmail',
      'registerPassword',
      'loginError'
    ])
  },
  methods: {
    ...mapMutations('autentication', [
      'setRegisterEmail',
      'setRegisterPassword'
    ]),
    ...mapActions('authentication', ['login'])
    // async logar (evt) {
    //   evt.preventDefault()
    //   if (this.email !== '' && this.password !== '') {
    //     await HTTPClient.post('/auth/login', { email: this.email, password: this.password }).then(res => {
    //       console.log(res.data)
    //       const autenticado = res.data
    //       return autenticado
    //     })
    //   } else {
    //     this.$q.notify({
    //       color: 'red-5',
    //       textColor: 'white',
    //       icon: 'warning',
    //       message: 'Preencha todos os campos'
    //     })
    //   }
    // }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
