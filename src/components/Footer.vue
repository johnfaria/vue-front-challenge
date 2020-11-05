<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading"></strong>

        <v-spacer></v-spacer>

        <v-btn
          class="mx-4"
          dark
          icon
          href="https://github.com/johnfaria/dev-hiring-challenge"
        >
          <v-icon size="40px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>John Faria</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icon: 'mdi-github'
  })
}
</script>
