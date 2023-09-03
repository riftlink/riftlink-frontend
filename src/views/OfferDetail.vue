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
              <router-link to="/"><i class="mdi mdi-arrow-left"></i> Volver a ofertas</router-link>
            </v-col>
          </v-row>

          <!-- Header -->
          <v-row class="mb-3" justify="center">
            <v-col cols="12">
              <h2>{{ offer.positionName }} para {{ offer.teamName }}</h2>
            </v-col>
          </v-row>

          <!-- Detail card -->
          <v-card class="mb-3">
            <v-row class="my-3" no-gutters align="center">
              <v-col md="4" lg="3" xl="2">
                <v-card-title>
                  <v-avatar size="128">
                    <v-img cover :src="offer.logoUrl" alt="{{ offer.teamName }} Logo" />
                  </v-avatar>
                </v-card-title>
              </v-col>
              <v-col>
                <v-card-text>
                  <p class="caption">Club: {{ offer.teamName }}</p>
                  <p class="caption">Posición: {{ offer.positionName }}</p>
                  <p class="caption">Rango requerido: {{ offer.rank }}</p>
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-text>
                  <p class="caption text-end">Publicada el: {{ formatDate(offer.createdAt) }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>

          <!-- Requirements -->
          <v-card class="mb-3">
            <v-expansion-panels>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title>
                  Qué pedimos
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="pa-2" v-html="markdown.render(offer.requirements)"></p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <!-- About us -->
          <v-card class="mb-3">
            <v-expansion-panels>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title>
                  Qué ofrecemos
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="pa-2" v-html="markdown.render(offer.aboutUs)"></p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <v-btn class="mt-3" :style="{left: '50%', transform:'translateX(-50%)'}" min-width="10rem" color="primary" @click="onApplyClick">
            Aplicar
          </v-btn>
        </template>
      </v-col>
    </v-row>

    <v-dialog v-model="loginLightboxOpen" max-width="500px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeLoginLightbox"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-text class="text-center">
          <div class="headline mb-3">¡Crea tu perfil en un momento y aplica a esta oferta y muchas más!</div>
          <v-btn class="mt-3 mb-12" @click="login" color="primary">Vamos a ello</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="applyLightboxOpen" max-width="500px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeApplyLightbox"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-text class="text-center">
          <div class="headline mb-3">Para aplicar a esta oferta, envía un MD al siguiente usuario a través de Discord:</div>
          <div class="headline mb-3"><em>{{ offer.applyContact }}</em></div>
          <div class="headline mb-3">Avisa que vas de parte de Riftlink y... ¡Mucha suerte!</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import offersApiClient from "@/services/OffersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

import MarkdownIt from "markdown-it";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      loginLightboxOpen: false,
      applyLightboxOpen: false,
      offer: {
        teamName: '',
        positionName: '',
        rank: '',
        logoUrl: '',
        applyUrl: '',
        requirements: '',
        applyContact: '',
        aboutUs: '',
      },
      isAuthenticated: null,
    };
  },
  async created() {
    await this.fetchOffer();
  },
  setup() {
    const markdown = new MarkdownIt()
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return { markdown, isAuthenticated, loginWithRedirect }
  },
  methods: {
    async fetchOffer() {
      const offerId = this.$route.params.id
      try {
        const offer = await offersApiClient.fetchOffer(offerId)
        this.offer = offer;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar la oferta.")
        console.error("Couldn't get offer:", error);
        this.state = 'error'
      }
    },
    login() {
      this.loginWithRedirect();
    },
    onApplyClick() {
      if (!this.isAuthenticated) {
        this.loginLightboxOpen = true
      } else if (this.offer.applyUrl) {
        window.open(this.offer.applyUrl, '_blank')
      } else {
        this.applyLightboxOpen = true
      }
    },
    closeLoginLightbox() {
      this.loginLightboxOpen = false;
    },
    closeApplyLightbox() {
      this.applyLightboxOpen = false;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },
};
</script>
