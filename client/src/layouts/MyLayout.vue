<template>
  <q-layout view="hHh LpR lFf">

    <q-header reveal elevated class="text-white" height-hint="98" style="background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);">
      <q-toolbar>
        <q-btn dense flat rounded icon="menu" @click="left = !left" />

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

    <q-drawer v-model="left" side="left" overlay bordered content-class="grad">
      <q-list>
        <div class="q-pa-md text-white" style="max-width: 350px">
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                HOME
              </q-item-section>
            </q-item>
            <q-expansion-item expand-separator icon="assignment" label="CADASTROS" default-closeed expand-icon-class="text-white">
              <q-list padding>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="add_to_photos" />
                  </q-item-section>
                  <q-item-section>
                    Conteúdo
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="footer grad text-white" style="border-radius: 0px">
      <q-toolbar class="flex flex-center">
        <p style="text-align: center">Coporight© <strong> <a> 2020 - Dashboard®. </a></strong> Todos os direitos reservados.
          Desenvolvido por <a href="https://github.com/kontrolbits" style="color:rgba(112, 54, 119, 1) "><strong>Kontrol Bits</strong></a>
        </p>
      </q-toolbar>
    </q-footer>
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
<style>
.footer {
    position: absolute;
}
.grad {
    background: linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);
}
.grad-invertido {
    background: linear-gradient(to left, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%);
}
.meu-icone {
    color: rgba(241, 121, 27, 1);
}
</style>
