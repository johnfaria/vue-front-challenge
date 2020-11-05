<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-card class="pa-10" elevation="8" shaped width="600px">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required"
              >
                <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  label="Password"
                  required
                ></v-text-field>
              </validation-provider>
              <v-btn class="mr-4" type="submit" :disabled="invalid">
                submit
              </v-btn>
            </form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { HTTP } from '../utils/http-common'

import { required, email, max } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  props: {
    userinfo: Object
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate()
      const response = await HTTP.post(`/auth/signin`, {
        email: this.email,
        password: this.password
      })

      if (response.status === 200) {
        this.userinfo.token = response.headers['auth-token']
        this.userinfo.data = response.data
        this.$router.push('/painel')
      }
    }
  }
}
</script>