<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Back Button -->
        <v-row>
          <v-col cols="12" sm="8" md="6">
            <router-link to="/admin/teams"><i class="mdi mdi-arrow-left"></i> Atrás</router-link>
          </v-col>
        </v-row>

        <v-card class="mt-3">
          <v-card-title>
            <div>
              <span class="headline">Crear nuevo club</span>
            </div>
          </v-card-title>

          <v-col cols="12" sm="12" md="12">
            <!-- Team Name Field -->
            <v-text-field
              v-model="team.teamName"
              label="Nombre del club"
              outlined
            ></v-text-field>

            <!-- Logo Component -->
            <v-row justify="center">
              <v-col cols="12" md="2">
                <v-avatar
                  class="mb-4"
                  color="grey-darken-1"
                  size="64"
                >
                  <v-img
                    alt="Avatar"
                    :src="team.logoUrl"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="10">
                <v-text-field
                  v-model="team.logoUrl"
                  label="URL del avatar"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- About Us Field -->
            <v-textarea
              v-model="team.aboutUs"
              label="Qué ofrecemos"
              outlined
            ></v-textarea>

            <!-- Apply Contact Field -->
            <v-text-field
              v-model="team.applyContact"
              label="Usuario de Discord de contacto"
              outlined
            ></v-text-field>

            <!-- Checkbox Active -->
            <v-checkbox
                v-model="team.active"
                label="Activa"></v-checkbox>
          </v-col>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>
            <div>
              <span class="headline">Social links</span>
            </div>
          </v-card-title>

          <v-col cols="12" sm="12" md="12">
            <!-- Apply Contact Field -->
            <v-text-field
              v-model="team.websiteLink"
              label="Sitio web"
              outlined
            ></v-text-field>

            <!-- Apply Contact Field -->
            <v-text-field
              v-model="team.linktreeHandle"
              label="Linktree handle"
              outlined
            ></v-text-field>

            <!-- Apply Contact Field -->
            <v-text-field
              v-model="team.discordInvite"
              label="Discord invite"
              outlined
            ></v-text-field>

            <!-- Apply Contact Field -->
            <v-text-field
              v-model="team.twitterHandle"
              label="Twitter handle"
              outlined
            ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create Button -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn block color="primary" @click="createTeam">Crear</v-btn>
      </v-col>
    </v-row>

  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import { useAuth0 } from '@auth0/auth0-vue';

import teamsApiClient from "@/services/TeamsApiClient.js"

export default {
  components: {
    Alert,
  },
  data() {
    return {
      loading: true,
      team: {
        teamName: '',
        logoUrl: '',
        aboutUs: '',
        applyContact: '',
        websiteLink: '',
        linktreeHandle: '',
        discordInvite: '',
        twitterHandle: '',
        active: false,
      },
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  methods: {
    async createTeam() {
      try {
        const accessToken = await this.getAccessTokenSilently()
        await teamsApiClient.createTeam(accessToken, this.team)
        this.$router.push('/admin/teams');
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un problema al crear el club.")
        console.error("Couldn't save team:", error);
      }
    },
  },
};
</script>
