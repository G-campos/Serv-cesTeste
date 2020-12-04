<template>
  <q-layout view="hHh LpR lFf">

    <q-header reveal elevated class="text-white" height-hint="98" style="background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo_branco.svg">
          </q-avatar>
          Dashboard
        </q-toolbar-title>

        <div v-if="auth">
          <q-btn dense flat icon="mdi-account-plus" to="/register" label="Cadastrar" class="q-pa-xs"/>
          <q-btn dense flat icon="login" to="/login" label="Login" class="q-pa-xs"/>
        </div>
        <div v-else>
          <q-btn dense flat round icon="" @click="logoff()" label="logoff" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered style="background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);">

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      left: false,
      auth: true
    }
  }
}
</script>
