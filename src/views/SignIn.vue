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
                  :type="'password'"
                ></v-text-field>
              </validation-provider>
              <v-btn type="submit" :disabled="invalid">
                submit
              </v-btn>
              <span class="red--text" v-if="loginError"
                >Email ou senha incorretos!</span
              >
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
  message: 'Este campo não pode estar vazio'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Insira um email válido'
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
    password: '',
    loginError: false,
    show: false
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate()
      try {
        const response = await HTTP.post(`/auth/signin`, {
          email: this.email,
          password: this.password
        })

        if (response.status === 200) {
          this.userinfo.token = response.headers['auth-token']
          this.userinfo.data = response.data
          this.$router.push('/painel')
        }
      } catch (error) {
        if (error.response.data.message) {
          this.loginError = true
        }
      }
    }
  }
}
</script>
