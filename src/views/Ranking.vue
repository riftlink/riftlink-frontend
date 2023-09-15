<template>
  <v-container>
    <h1>Ranking</h1>
    <template v-if="state == 'error'">
      <v-row>
        <v-col cols="12">
          <p class="text-center">¡Ups! Hubo un error al recuperar los summoners. Refresca la página para intentarlo de nuevo.</p>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="state == 'loading'">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <!-- Save Button -->
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Rank
            </th>
            <th class="text-left">
              LP
            </th>
            <th class="text-left">
              Wins
            </th>
            <th class="text-left">
              Losses
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="summoner in ranking"
            :key="summoner.id"
          >
            <td>{{ summoner.index }}</td>
            <td>{{ summoner.name }}</td>
            <td>{{ formatRank(summoner) }}</td>
            <td>{{ summoner.leaguePoints }}</td>
            <td>{{ summoner.wins }}</td>
            <td>{{ summoner.losses }}</td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import rankingApiClient from "@/services/RankingApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      ranking: [],
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchRanking();
  },
  methods: {
    async fetchRanking() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const ranking = await rankingApiClient.getRanking(accessToken)
        this.ranking = ranking;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar el ranking.")
        console.error("Couldn't get ranking:", error);
        this.state = 'error';
      }
    },
    formatRank(summoner) {
      const formattedRank = summoner.tier.charAt(0).toUpperCase() + summoner.tier.slice(1).toLowerCase()
      if (summoner.tier === "UNRANKED" || summoner.tier === "MASTER" || summoner.tier === "GRANDMASTER" || summoner.tier === "CHALLENGER") {
        return formattedRank
      }
      return formattedRank + " " + summoner.rank
    }
  },
};
</script>
