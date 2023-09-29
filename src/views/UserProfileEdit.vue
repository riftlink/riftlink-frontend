<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2>Mi perfil</h2>

        <template v-if="state == 'error'">
          <v-row>
            <v-col cols="12">
              <p class="text-center">¡Ups! Hubo un error al recuperar tu perfil. Refresca la página para intentarlo de nuevo.</p>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="state == 'loading'">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </template>
        <template v-else>
          <!-- Avatar and Username Component -->
          <v-row class="my-3" justify="center" align="center">
            <v-col cols="12" sm="2">
              <v-avatar
                class="mb-4"
                color="grey-darken-1"
                size="96"
              >
                <v-img
                  alt="Avatar"
                  :src="avatarUrl"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="10">
              <v-text-field
                v-model="username"
                label="Nombre de usuario"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Summoner name Field -->
          <v-row justify="center">
            <v-col>
              <v-text-field v-model="summonerName" label="Nombre de invocador" outlined></v-text-field>
            </v-col>
          </v-row>

          <!-- Summoner role Field -->
          <v-row justify="center">
            <v-col>
              <v-text-field v-model="role" label="Rol" outlined></v-text-field>
            </v-col>
          </v-row>

          <!-- About me Field -->
          <v-row justify="center">
            <v-col>
              <v-textarea
                v-model="aboutMe"
                label="Sobre mí"
                outlined
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Save Button -->
          <v-btn class="mt-3" :style="{left: '50%', transform:'translateX(-50%)'}" min-width="10rem" color="primary" @click="saveProfile">Guardar</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import usersApiClient from "@/services/UsersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      username: "",
      avatarUrl: "",
      summonerName: "",
      role: "",
      aboutMe: "",
      alert: {
        visible: false,
        text: '',
        color: ''
      }
    };
  },
  setup() {
    const { user, getAccessTokenSilently } = useAuth0();

    return {
      user,
      getAccessTokenSilently,
      username: user.value.nickname,
      avatarUrl: user.value.picture
    }
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const userData = await usersApiClient.fetchCurrentUser(accessToken)
        this.summonerName = userData.summonerName;
        this.role = userData.role;
        this.aboutMe = userData.aboutMe;
        this.state = 'ok'
      } catch (err) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar tu perfil.")
        console.error("Couldn't get current user profile:", err);
        this.state = 'error'
      }
    },
    async saveProfile() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const user = {
          summonerName: this.summonerName,
          role: this.role,
          aboutMe: this.aboutMe
        }
        await usersApiClient.saveCurrentUser(accessToken, user)
        this.$refs.alert.alertSuccess('¡Guardado con éxito!')
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al guardar tu perfil.")
        console.error("Couldn't save current user profile:", error);
      }
    },
  },
};
</script>
