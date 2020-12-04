<template>
  <q-layout view="hHh LpR lFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Dashboard
        </q-toolbar-title>

        <q-btn dense flat round icon="login" to="/login"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>

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
      left: false
    }
  }
}
</script>
