<template>
<q-layout view="hHh LpR lFf">
    <q-page-container>
        <q-page class="flex flex-center" style="background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);">
            <div class="q-gutter-md text-gray">
                <q-form>
                    <div class="row justify-center q-pt-md">
                      <p class="text-h3 text-gray">Login</p>
                    </div>
                    <q-input class="q-pb-md" v-model="email" rounded outlined type="email" label="Email" autofocus />
                    <q-input v-model="password" rounded outlined :type="isPwd ? 'password' : 'text'" label="Senha">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <div class="row justify-center q-pt-md">
                        <q-btn rounded label="Entrar" type="submit" to="/"/>
                    </div>
                </q-form>
            </div>
        </q-page>
    </q-page-container>
</q-layout>
</template>

<script>
// import {
//   HTTPClient
// } from '../boot/axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true
    }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3

</style>
