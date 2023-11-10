<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="state == 'error'">
          <v-row>
            <v-col cols="12">
              <p class="text-center">¡Ups! Hubo un error al recuperar el jugador. Refresca la página para intentarlo de nuevo.</p>
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
              <router-link to="/ranking"><i class="mdi mdi-arrow-left"></i> Volver a jugadores</router-link>
            </v-col>
          </v-row>

          <!-- Header -->
          <v-row class="mb-3" justify="center">
            <v-col cols="12">
              <h2>{{ player.name }}</h2>
            </v-col>
          </v-row>

          <!-- Detail card -->
          <v-card class="mb-3">
            <v-row class="my-3" no-gutters align="center">
              <v-col>
                <v-card-text>
                  <p class="caption">Nombre de invocador: {{ player.name }}</p>
                </v-card-text>
                <v-card-text>
                  <p class="caption">Rango: {{ player.tier }} {{ player.rank }}</p>
                </v-card-text>
                <v-card-text>
                  <p class="caption">League points: {{ player.leaguePoints }}</p>
                </v-card-text>
                <v-card-text>
                  <p class="caption">Wins: {{ player.wins }}</p>
                </v-card-text>
                <v-card-text>
                  <p class="caption">Loses: {{ player.losses }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import summonersApiClient from "@/services/SummonersApiClient.js"

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      panels: [0],
      player: {
        name: '',
        tier: '',
        rank: '',
        leaguePoints: '',
        wins: '',
        losses: '',
      }
    };
  },
  async created() {
    await this.fetchPlayer();
  },
  methods: {
    async fetchPlayer() {
      const playerId = this.$route.params.id
      try {
        const summoner = await summonersApiClient.fetchSummoner(playerId)
        this.player = summoner;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar el jugador.")
        console.error("Couldn't get player:", error);
        this.state = 'error'
      }
    }
  },
};
</script>
