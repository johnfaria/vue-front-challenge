<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <div class="d-flex align-center">
        <h1>GitHubApp</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="userinfo.token" to="/signin" @click="deleteToken">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn v-else to="/signin">
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn to="/signup">
        <span class="mr-2">Registrar</span>
        <v-icon>mdi-login</v-icon>
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
