<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="state == 'error'">
          <v-row>
            <v-col cols="12">
              <p class="text-center">¡Ups! Hubo un error al recuperar el club. Refresca la página para intentarlo de nuevo.</p>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="state == 'loading'">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </template>
        <template v-else>
          <!-- Back Button -->
          <v-row>
            <v-col cols="12" sm="8" md="6">
              <router-link to="/admin/teams">Atrás</router-link>
            </v-col>
          </v-row>

          <v-card>
            <v-card-title>
              <v-row justify="center">
                <v-col cols="12" md="10">
                  <!-- Header -->
                  <div>
                    <span class="headline">Editar club</span>
                  </div>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn block color="primary" @click="saveTeam">Guardar</v-btn>
                </v-col>
              </v-row>
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
                    size="128"
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

          <!-- Social links -->
          <v-card class="mt-3">
            <v-card-title>
              <div>
                <span class="headline">Social links</span>
              </div>
            </v-card-title>

            <v-col cols="12">
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

          <!-- Danger zone -->
          <v-card class="mt-3">
            <v-card-title>
              <div>
                <span class="headline">Zona de peligro</span>
              </div>
            </v-card-title>

            <v-col cols="12">
              <v-btn color="primary" @click="openDeleteLightbox">Eliminar</v-btn>
            </v-col>
          </v-card>

          <!-- Delete lightbox -->
          <v-dialog v-model="deleteLightboxOpen" max-width="500px">
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDeleteLightbox"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
              <v-card-text class="text-center">
                <div class="headline mb-3">ATENCIÓN: esta operación es irreversible. ¿estás seguro de que deseas borrar el club?</div>
                <v-text-field
                  v-model="deleteConfirmation"
                  label="Escribe la palabra 'eliminar' para confirmar el borrado"
                  outlined
                ></v-text-field>
                <v-btn class="mt-3 mb-12" @click="deleteTeam" color="primary">Eliminar</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
      </v-col>
    </v-row>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';
import teamsApiClient from "@/services/TeamsApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      team: null,
      deleteLightboxOpen: false,
      deleteConfirmation: ''
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchTeam();
  },
  methods: {
    async fetchTeam() {
      try {
        const teamId = this.$route.params.id
        const team = await teamsApiClient.fetchTeam(teamId)
        this.team = team;
        this.state = 'ok'
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un problema al recuperar el club.")
        console.error("Couldn't get team:", error);
        this.state = 'error'
      }
    },
    async saveTeam() {
      const teamId = this.$route.params.id
      const accessToken = await this.getAccessTokenSilently()
      try {
        await teamsApiClient.saveTeam(accessToken, teamId, this.team)
        this.$refs.alert.alertSuccess("¡Guardado con éxito!")
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al guardar el club.")
        console.error("Couldn't save team:", error);
      }
    },
    async deleteTeam() {
      if (this.deleteConfirmation !== 'eliminar') {
        return
      }
      const teamId = this.$route.params.id
      const accessToken = await this.getAccessTokenSilently()
      try {
        await teamsApiClient.deleteTeam(accessToken, teamId)
        this.$router.push('/admin/teams');
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al eliminar el club.")
        console.error("Couldn't delete team:", error);
      }
    },
    openDeleteLightbox() {
      this.deleteLightboxOpen = true
    },
    closeDeleteLightbox() {
      this.deleteLightboxOpen = false
    }
  },
};
</script>
