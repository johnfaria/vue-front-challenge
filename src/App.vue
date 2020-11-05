<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-icon size="30px" class="mr-3">mdi-github</v-icon>
        <h2>GitHub Top Stars</h2>
        <v-icon size="30px" class="ml-3 yellow--text">mdi-star</v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="userinfo.token" to="/signin" @click="deleteToken">
        <span>Logout</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn v-else to="/signin">
        <span>Login</span>
        <v-icon class="ml-2" medium>mdi-lock-open</v-icon>
      </v-btn>

      <v-btn class="ml-4" to="/signup">
        <span>Registrar</span>
        <v-icon class="ml-2">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :userinfo="userinfo"></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({
    userinfo: {
      token: '',
      data: {}
    }
  }),
  methods: {
    deleteToken() {
      this.userinfo.token = ''
      this.userinfo.data = {}
    }
  }
}
</script>

<style lang="css">
#app {
  background-color: #ebedf0;
}
</style>
