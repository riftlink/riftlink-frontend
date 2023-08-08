<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="loading">
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
              <div>
                <span class="headline">Editar oferta</span>
              </div>
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
                    size="64"
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
        </template>
      </v-col>
    </v-row>

    <!-- Save Button -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn block color="primary" @click="saveOffer">Guardar</v-btn>
      </v-col>
    </v-row>

  </v-container>

  <v-snackbar
      v-model="alert.visible"
      :color="alert.color"
      variant="elevated"
      location="top end"
      :timeout="5000"
    >
    {{ alert.text }}

    <template v-slot:actions>
      <v-btn
        @click="alert.visible = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import offersApiClient from "@/services/OffersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  data() {
    return {
      loading: true,
      offer: null,
      alert: {
        visible: false,
        text: '',
        color: ''
      }
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
      } catch (error) {
        console.error("Error al obtener la oferta de empleo:", error);
      } finally {
        this.loading = false;
      }
    },
    async saveOffer() {
      const offerId = this.$route.params.id
      const accessToken = await this.getAccessTokenSilently()
      try {
        await offersApiClient.saveOffer(accessToken, offerId, this.offer)
        this.alertSuccess("¡Guardado con éxito!")
      } catch (error) {
        console.error("Error al guardar el los detalles de la oferta:", error);
      }
    },
    alertSuccess(message) {
      this.alert.text = message
      this.alert.color = 'success'
      this.alert.visible = true
    }
  },
};
</script>
