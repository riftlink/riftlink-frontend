<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Back Button -->
        <v-row>
          <v-col cols="12" sm="8" md="6">
            <router-link to="/admin/offers"><i class="mdi mdi-arrow-left"></i> Atrás</router-link>
          </v-col>
        </v-row>

        <v-card class="mt-3">
          <v-card-title>
            <div>
              <span class="headline">Crear nueva oferta</span>
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

        <v-card class="mt-3">
          <v-card-title>
            <div>
              <span class="headline">Social links</span>
            </div>
          </v-card-title>

          <v-col cols="12" sm="12" md="12">
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
      </v-col>
    </v-row>

    <!-- Create Button -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn block color="primary" @click="createOffer">Crear</v-btn>
      </v-col>
    </v-row>

  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import { useAuth0 } from '@auth0/auth0-vue';

import offersApiClient from "@/services/OffersApiClient.js"

export default {
  components: {
    Alert,
  },
  data() {
    return {
      loading: true,
      offer: {
        teamName: '',
        positionName: '',
        rank: '',
        logoUrl: '',
        applyUrl: '',
        requirements: '',
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
    async createOffer() {
      try {
        const accessToken = await this.getAccessTokenSilently()
        await offersApiClient.createOffer(accessToken, this.offer)
        this.$router.push('/admin/offers');
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un problema al crear la oferta.")
        console.error("Couldn't save offer:", error);
      }
    },
  },
};
</script>
