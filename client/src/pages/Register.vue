<template>
  <q-layout view="hHh LpR lFf">
    <q-page-container>
      <q-page class="flex flex-center" style="background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);">
        <div class="q-gutter-md">
          <!-- form cadastro -->
          <q-form @submit="cadastrarUser">
            <q-input
              v-model="email"
              rounded
              outlined
              type="email"
              label="Email"
            />
            <q-input
              class="q-pt-md q-pb-md"
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
                color="linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%)"
                to="/"
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import HTTPClient from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      accept: false,
      confirmaPwd: ''
    }
  },
  created () {
  },
  methods: {
    cadastraUser () {
      HTTPClient.post('/auth/register', { nome: this.email, password: this.password }).then(res => {
        Notify.create({
          message: res.data,
          position: 'top',
          color: 'green'
        })
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3

</style>
