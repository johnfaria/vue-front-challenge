<template>
  <v-card
    class="mx-auto"
    color="dark"
    dark
    :href="repository.html_url"
    target="_blank"
  >
    <v-card-title>
      <v-icon large left>
        mdi-github
      </v-icon>
      <span class="title font-weight-light">{{ repository.name }}</span>
    </v-card-title>

    <v-card-text class="subtitle font-weight-bold">
      {{ repository.description | truncate }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>{{ repository.language }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1">
            mdi-star
          </v-icon>
          <span class="subheading mr-2">{{ repository.stargazers_count }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardRepo',
  props: {
    repository: Object
  },
  filters: {
    truncate: function(text) {
      if (text.length > 120) {
        return text.substring(0, 120) + '...'
      } else {
        return text
      }
    }
  }
}
</script>
