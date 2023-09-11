<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="state == 'error'">
          <v-row>
            <v-col cols="12">
              <p class="text-center">¡Ups! Hubo un error al recuperar la oferta. Refresca la página para intentarlo de nuevo.</p>
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
              <router-link to="/admin/offers">Atrás</router-link>
            </v-col>
          </v-row>

          <v-card>
            <v-card-title>
              <v-row justify="center">
                <v-col cols="12" md="10">
                  <!-- Header -->
                  <div>
                    <span class="headline">Editar oferta</span>
                  </div>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn block color="primary" @click="saveOffer">Guardar</v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <v-col cols="12" sm="12" md="12">
              <!-- Position Name Field -->
              <v-text-field
                v-model="offer.positionName"
                label="Posición"
                outlined
              ></v-text-field>

              <!-- Team Name Field -->
              <v-text-field
                v-model="offer.teamName"
                label="Nombre del equipo"
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
                      :src="offer.logoUrl"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="10">
                  <v-text-field
                    v-model="offer.logoUrl"
                    label="URL del avatar"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Rank Field -->
              <v-text-field
                v-model="offer.rank"
                label="Rango requerido"
                outlined
              ></v-text-field>

              <!-- Requirements Field -->
              <v-textarea
                v-model="offer.requirements"
                label="Qué pedimos"
                outlined
              ></v-textarea>

              <!-- About Us Field -->
              <v-textarea
                v-model="offer.aboutUs"
                label="Qué ofrecemos"
                outlined
              ></v-textarea>

              <!-- Apply Contact Field -->
              <v-text-field
                v-model="offer.applyContact"
                label="Usuario de Discord de contacto"
                outlined
              ></v-text-field>

              <!-- Apply Url Field -->
              <v-text-field
                v-model="offer.applyUrl"
                label="Link para aplicar"
                outlined
              ></v-text-field>

              <!-- Checkbox Active -->
              <v-checkbox
                v-model="offer.active"
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
                v-model="offer.websiteLink"
                label="Sitio web"
                outlined
              ></v-text-field>

              <!-- Apply Contact Field -->
              <v-text-field
                v-model="offer.linktreeHandle"
                label="Linktree handle"
                outlined
              ></v-text-field>

              <!-- Apply Contact Field -->
              <v-text-field
                v-model="offer.discordInvite"
                label="Discord invite"
                outlined
              ></v-text-field>

              <!-- Apply Contact Field -->
              <v-text-field
                v-model="offer.twitterHandle"
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
                <div class="headline mb-3">ATENCIÓN: esta operación es irreversible. ¿estás seguro de que deseas borrar la oferta?</div>
                <v-text-field
                  v-model="deleteConfirmation"
                  label="Escribe la palabra 'eliminar' para confirmar el borrado"
                  outlined
                ></v-text-field>
                <v-btn class="mt-3 mb-12" @click="deleteOffer" color="primary">Eliminar</v-btn>
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
import offersApiClient from "@/services/OffersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      offer: null,
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
    await this.fetchOffer();
  },
  methods: {
    async fetchOffer() {
      try {
        const offerId = this.$route.params.id
        const offer = await offersApiClient.fetchOffer(offerId)
        this.offer = offer;
        this.state = 'ok'
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un problema al recuperar la oferta.")
        console.error("Couldn't get offer:", error);
        this.state = 'error'
      }
    },
    async saveOffer() {
      const offerId = this.$route.params.id
      const accessToken = await this.getAccessTokenSilently()
      try {
        await offersApiClient.saveOffer(accessToken, offerId, this.offer)
        this.$refs.alert.alertSuccess("¡Guardado con éxito!")
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al guardar la oferta.")
        console.error("Couldn't save offer:", error);
      }
    },
    async deleteOffer() {
      if (this.deleteConfirmation !== 'eliminar') {
        return
      }
      const offerId = this.$route.params.id
      const accessToken = await this.getAccessTokenSilently()
      try {
        await offersApiClient.deleteOffer(accessToken, offerId)
        this.$router.push('/admin/offers');
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al eliminar la oferta.")
        console.error("Couldn't delete offer:", error);
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
