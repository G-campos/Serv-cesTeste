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

        <div class="col-4 q-pa-md">
          <q-card class="row justify-center col-6 my-card">
            <q-card-section class="col-12 text-center">
              <div class="text-subtitle1"> Cadastrar Cliente </div>
            </q-card-section>

            <q-separator inset />
            <q-card-section class="col-12">
              <div class="row justify-center">
                <q-input
                  outlined
                  v-model="cadastro.cliente"
                  class="col-10 q-mt-lg"
                  label="Nome do Cliente"
                />
              </div>
              <div class="row justify-end q-mt-xl q-mb-lg">
                <q-btn
                  class="q-mt-lg"
                  color="primary"
                  label="Cadastrar"
                  @click="cadastraCliente()"
                />
              </div>
            </q-card-section>
          </q-card>
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
      isPwd: true,
      accept: false,
      confirmaPwd: ''
    }
  },
  created () {
  },
  methods: {
    cadastraCliente () {
      HTTPClient.post('/cadastro/cliente', { nome: this.cadastro.cliente }).then(res => {
        Notify.create({
          message: res.data,
          position: 'top',
          color: 'green'
        })
        this.getClientes()
      })
    }
  }
}
</script>
