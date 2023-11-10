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
              <router-link to="/"><i class="mdi mdi-arrow-left"></i> Volver a clubes</router-link>
            </v-col>
          </v-row>

          <!-- Header -->
          <v-row class="mb-3" justify="center">
            <v-col cols="12">
              <h2>{{ offer.teamName }}</h2>
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
                  <p class="caption">{{ offer.teamName }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>

          <!-- Social networks -->
          <v-card class="mb-3" v-if="shouldShowSocialLinks">
            <v-expansion-panels v-model="panels">
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title>
                  Redes sociales
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mt-3">
                    <a class="mr-2" :href="twitterUrl" target="_blank" v-if="offer.twitterHandle">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-twitter.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="offer.discordInvite" target="_blank" v-if="offer.discordInvite">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-discord.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="offer.websiteLink" target="_blank" v-if="offer.websiteLink">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-web.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="linktreeUrl" target="_blank" v-if="offer.linktreeHandle">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-linktree.png"
                      ></v-img>
                    </a>
                  </p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <!-- About us -->
          <v-card class="mb-3" v-if="offer.aboutUs">
            <v-expansion-panels>
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title>
                  Sobre nosotros
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="pa-2" v-html="markdown.render(offer.aboutUs)"></p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
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

import MarkdownIt from "markdown-it";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      panels: [0],
      offer: {
        teamName: '',
        logoUrl: '',
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
  computed: {
    twitterUrl() {
      return 'https://www.twitter.com/' + this.offer.twitterHandle
    },
    linktreeUrl() {
      return 'https://www.linktr.ee/' + this.offer.linktreeHandle
    },
    shouldShowSocialLinks() {
      return this.offer.twitterHandle
          || this.offer.linktreeHandle
          || this.offer.discordInvite
          || this.offer.websiteLink
    }
  },
  methods: {
    async fetchOffer() {
      const offerId = this.$route.params.id
      try {
        const offer = await offersApiClient.fetchOffer(offerId)
        this.offer = offer;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar el club.")
        console.error("Couldn't get offer:", error);
        this.state = 'error'
      }
    },
    login() {
      this.loginWithRedirect();
    }
  },
};
</script>
