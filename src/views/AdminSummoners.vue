<template>
  <v-container>
    <h1>Summoners</h1>
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
              Id
            </th>
            <th class="text-left">
              User Id
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
              Sortable Rank
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
            v-for="summoner in summoners"
            :key="summoner.id"
          >
            <td>{{ summoner.id }}</td>
            <td>{{ summoner.userId }}</td>
            <td>{{ summoner.name }}</td>
            <td>{{ summoner.tier }} {{ summoner.rank }}</td>
            <td>{{ summoner.leaguePoints }}</td>
            <td>{{ summoner.sortableRank }}</td>
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

import summonersApiClient from "@/services/SummonersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      summoners: [],
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchSummoners();
  },
  methods: {
    async fetchSummoners() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const summoners = await summonersApiClient.listAllSummoners(accessToken)
        this.summoners = summoners;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar los summoners.")
        console.error("Couldn't get summoners:", error);
        this.state = 'error';
      }
    },
  },
};
</script>
