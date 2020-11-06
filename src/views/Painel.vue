<template>
  <div>
    <v-container>
      <v-card class="pa-10" min-height="30vh">
        <h1>Bem vindo {{ userinfo.data.fullname }}!</h1>
        <div class="form">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form>
              <validation-provider
                v-slot="{ errors }"
                name="languages"
                rules="required|minmax:5,5"
              >
                <v-autocomplete
                  width="200px"
                  v-model="values"
                  :items="items"
                  outlined
                  dense
                  chips
                  :error-messages="errors"
                  small-chips
                  label="Escolha as suas linguagens favoritas"
                  multiple
                  counter="5"
                  required
                ></v-autocomplete>
              </validation-provider>
              <v-btn
                class="mb-10"
                @click="submit"
                :disabled="invalid"
                :loading="loading"
              >
                Enviar
              </v-btn>
              <br />
              <span class="red--text" v-if="repoError"
                >Erro ao obter repositórios!</span
              >
            </form>
          </validation-observer>
        </div>
        <div class="repo-section">
          <CardRepo
            class="repo-element"
            v-for="value in topRepositories"
            :repository="value"
            :key="value.id"
          ></CardRepo>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { HTTP } from '../utils/http-common'
import top50languages from '../utils/languages.json'
import CardRepo from '../components/CardRepo'
import { required } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationProvider,
  setInteractionMode,
  ValidationObserver
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'O campo não pode estar vazio'
})

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: 'O campo deve ter 5 linguagens'
})

export default {
  name: 'Painel',
  props: {
    userinfo: Object
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    CardRepo
  },
  data: () => ({
    items: top50languages,
    values: [],
    value: null,
    topRepositories: [],
    loading: false,
    repoError: false
  }),
  methods: {
    async submit() {
      this.$refs.observer.validate()
      this.loading = true
      try {
        const response = await HTTP.post(
          `/api/repos`,
          {
            languages: this.values
          },
          { headers: { 'auth-token': this.userinfo.token } }
        )

        if (response.status === 200) {
          this.topRepositories = response.data
          this.loading = false
          this.repoError = false
        }
      } catch (error) {
        this.repoError = true
        this.loading = false
        this.topRepositories = []
      }
    }
  },
  async created() {
    if (!this.userinfo.data.languages) {
      return
    }
    this.values = this.userinfo.data.languages

    try {
      const response = await HTTP.post(
        `/api/repos`,
        {
          languages: this.userinfo.data.languages
        },
        { headers: { 'auth-token': this.userinfo.token } }
      )

      if (response.status === 200) {
        this.topRepositories = response.data
        this.repoError = false
      }
    } catch (error) {
      this.repoError = true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.userinfo.token) {
        vm.$router.push('/signin')
      }
    })
  }
}
</script>

<style lang="css">
.form {
  margin-top: 50px;
  max-width: 500px;
}

.repo-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}

.repo-element {
  width: 18%;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
