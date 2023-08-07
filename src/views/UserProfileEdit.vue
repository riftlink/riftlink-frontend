<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center">
      <v-col cols="12">
        <h2 class="text-center">Mi perfil</h2>
      </v-col>
    </v-row>

    <!-- Avatar Component -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        >
          <v-img
            alt="Avatar"
            :src="avatarUrl"></v-img>
        </v-avatar>
      </v-col>
    </v-row>

    <!-- Username Field -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
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
      <v-col cols="12" sm="8" md="6">
        <v-text-field v-model="summonerName" label="Nombre de invocador" outlined></v-text-field>
      </v-col>
    </v-row>

    <!-- About me Field -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-textarea
          v-model="aboutMe"
          label="Sobre mí"
          outlined
          rows="3"
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- Save Button -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn block color="primary" @click="saveProfile">Guardar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import usersApiClient from "@/services/UsersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  data() {
    return {
      username: "",
      avatarUrl: "",
      summonerName: "",
      aboutMe: ""
    };
  },
  setup() {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    return {
      isAuthenticated,
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
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return
      }
      const accessToken = await this.getAccessTokenSilently()
      try {
        const userData = await usersApiClient.fetchCurrentUser(accessToken)
        console.log(userData)
        this.summonerName = userData.summonerName;
        this.aboutMe = userData.aboutMe;
      } catch (err) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    },
    async saveProfile() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const user = {
          summonerName: this.summonerName,
          aboutMe: this.aboutMe
        }
        await usersApiClient.saveCurrentUser(accessToken, user)
        console.log("Guardado con éxito!!")
      } catch (error) {
        console.error("Error al guardar el perfil del usuario:", error);
      }
    },
  },
};
</script>
