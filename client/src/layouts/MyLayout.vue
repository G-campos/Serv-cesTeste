<template>
  <q-layout view="hHh LpR fFf">

    <q-header reveal bordered class="grad">
      <q-toolbar>
        <q-btn dense flat rounded icon="menu" @click="left = !left" />

        <q-toolbar-title>
            <q-avatar>
              <img src="../assets/lambda2.png">
            </q-avatar>
          DASHBOARD
        </q-toolbar-title>

        <span>Status Servidor: </span>
        <q-btn flat rounded disable :icon="status.icone" :color="status.led" :label="status.txt" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered content-class="grad" style="max-width: 150px">
      <q-list>
        <div class="q-pa-md grad" style="max-width: auto">
          <q-list>
            <q-item clickable v-ripple @click="$router.push('/')">
              <q-item-section avatar>
                <q-icon name="mdi-death-star-variant" />
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="footer grad">
      <q-toolbar class="flex flex-center">
        <p style="text-align: center">Coporight© <strong> <a> 2020 - Dashboard®. </a></strong> Todos os direitos reservados.
          Desenvolvido por <a href="https://github.com/kontrolbits" style="text-decoration: none; color: #59e2b7;"><strong>Kontrol Bits</strong></a>
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
      status: {
        led: 'yellow',
        txt: 'Conectando...',
        icone: 'mdi-cloud-sync'
      }
    }
  },
  mounted () {
    this.serverConect()
  },
  methods: {
    async serverConect () {
      const ret = await this.$geralService.comunicaAsync('', 'get', '', 'Consulta status do servidor', false)
      // console.log(ret)
      if (ret === 'Servidor esta rodando') {
        this.status.led = 'green'
        this.status.txt = 'Online'
        this.status.icone = 'mdi-cloud-check'
        // setTimeout(this.serverConect, 2000)
      } else {
        this.status.led = 'red'
        this.status.txt = 'Offline'
        this.status.icone = 'mdi-cloud-alert'
        setTimeout(this.serverConect, 5000)
      }
    }
  }
}
</script>
<style>
.footer {
  position: absolute;
}

.grad {
  background: linear-gradient(to right, #2F495E 20%, #333333 100%);
  background-color: #e2e8f0;
  color: #00ffd5;
}
.grad-invertido {
  background: linear-gradient(to left,#333333 0%,  #2F495E 50%);
}
</style>
