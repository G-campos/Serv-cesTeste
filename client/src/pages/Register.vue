<template>
  <q-layout view="hHh LpR lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-gutter-md">
          <!-- form cadastro -->
          <q-form @submit="cadastrar">
            <q-input
              v-model="registerEmail"
              rounded
              outlined
              type="email"
              label="Email"
            />
            <q-input
              class="q-pt-md q-pb-md"
              v-model="registerPassword"
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
            <q-input
              v-model="confirmaPwd"
              rounded
              outlined
              :type="isPwd ? 'password' : 'text'"
              label="Confirma Senha"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-toggle
              v-model="accept"
              label="Eu concordo com os termos e licenças"
            />
            <div class="row justify-center q-pt-md">
              <q-btn
                rounded
                label="Entrar"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { HTTPClient } from '../boot/axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      isPwd: true,
      accept: false,
      confirmaPwd: ''
    }
  },
  created () {
  },
  computed: {
    ...mapState('authentication', [
      'registerEmail',
      'registerPassword'
    ])
  },
  methods: {
    ...mapMutations('autentication', [
      'setRegisterEmail',
      'setRegisterPassword'
    ])
    // async cadastrar (evt) {
    //   evt.preventDefault()
    //   if (this.email !== '' && this.password !== '' && this.confirmaPwd !== '') {
    //     if (this.password === this.confirmaPwd) {
    //       if (this.accept !== true) {
    //         this.$q.notify({
    //           color: 'red-5',
    //           textColor: 'white',
    //           icon: 'warning',
    //           message: 'Você precisa aceitar os termos primeiro'
    //         })
    //       } else {
    //         await HTTPClient.post('/auth/register', { email: this.email, password: this.password }).then(res => {
    //           console.log(res.data)
    //         })
    //         this.$q.notify({
    //           color: 'green-4',
    //           textColor: 'white',
    //           icon: 'cloud_done',
    //           message: 'Cadastrado'
    //         })
    //       }
    //     } else {
    //       this.$q.notify({
    //         color: 'red-5',
    //         textColor: 'white',
    //         icon: 'warning',
    //         message: 'Os campos de Senha e Confirma senha devem ser iguais'
    //       })
    //     }
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
