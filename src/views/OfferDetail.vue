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
          <v-card>
            <v-card-title>
              <v-avatar size="64">
                <img :src="offer.logoUrl" alt="Logo" />
              </v-avatar>
              <div>
                <span class="headline">{{ offer.positionName }}</span>
              </div>
            </v-card-title>

            <v-card-subtitle>
              <div>
                <span class="subtitle">{{ offer.teamName }}</span>
              </div>
            </v-card-subtitle>

            <v-card-text>
              <v-row key="rank" class="pa-2">
                <v-col cols="5">
                  <span class="caption">Rank</span>
                </v-col>
                <v-col cols="5">
                  <span class="body-1">{{ offer.rank }}</span>
                </v-col>
              </v-row>

              <v-row key="createdAt" class="pa-2">
                <v-col cols="5">
                  <span class="caption">Created at</span>
                </v-col>
                <v-col cols="5">
                  <span class="body-1">{{ offer.createdAt }}</span>
                </v-col>
              </v-row>
            </v-card-text>

            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  Qué pedimos
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="pa-2">{{ offer.requirements }}</p>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  Qué ofrecemos
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="pa-2">{{ offer.aboutUs }}</p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onApplyClick">
                Aplicar
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>

    <v-dialog v-model="lightboxOpen" max-width="500px">
      <v-card>
        <v-card-text class="text-center">
          <div class="headline">¡Crea tu perfil en un momento y aplica a esta oferta y muchas más!</div>
          <v-btn @click="login" color="primary">Vamos a ello</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeLightbox">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      lightboxOpen: false,
      offer: {
        teamName: '',
        positionName: '',
        rank: '',
        logoUrl: '',
        applyUrl: '',
        requirements: '',
        aboutUs: '',
      },
      isAuthenticated: null,
    };
  },
  async created() {
    await this.fetchOffer();
  },
  setup() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return { isAuthenticated, loginWithRedirect }
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
        this.lightboxOpen = true;
      } else {
        window.open(this.offer.applyUrl, '_blank');
      }
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
  },
};
</script>
