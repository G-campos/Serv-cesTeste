<template>
  <q-layout view="hHh LpR lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-gutter-md">
          <q-form @submit="onSubmit">
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
import { HTTPClient } from '../boot/axios'

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
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
