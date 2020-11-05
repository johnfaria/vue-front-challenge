<template>
  <v-container full-height>
    <h1>Bem vindo {{ userinfo.data.fullname }}</h1>
  </v-container>
</template>


<script>
export default {
  name: 'Painel',
  props: {
    userinfo: Object
  }
}
</script>

<style>
</style>