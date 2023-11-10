<template>
  <v-container>
    <h1>Clubes</h1>
    <template v-if="state == 'error'">
      <v-row>
        <v-col cols="12">
          <p class="text-center">¡Ups! Hubo un error al recuperar los clubes. Refresca la página para intentarlo de nuevo.</p>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="state == 'loading'">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <!-- Save Button -->
      <v-row justify="end" class="mb-3">
        <v-col cols="12" md="2">
          <router-link to="/admin/teams/new"><v-btn block color="primary">Nuevo club</v-btn></router-link>
        </v-col>
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Team
            </th>
            <th class="text-left">
              Active
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in teams"
            :key="team.id"
          >
            <td>{{ team.teamName }}</td>
            <td>
              <template v-if="team.active">
                <v-icon>mdi-check</v-icon>
              </template>
              <template v-else>
                -
              </template>
            </td>
            <td>
              <router-link :to="{ name: 'TeamDetail', params: { id: team.id }}"><v-icon>mdi-eye</v-icon></router-link>&nbsp;
              <router-link :to="{ name: 'AdminEditTeam', params: { id: team.id }}"><v-icon>mdi-pencil</v-icon></router-link>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
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
      teams: [],
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const teams = await teamsApiClient.fetchAllTeams(accessToken)
        this.teams = teams;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar los clubes.")
        console.error("Couldn't get teams:", error);
        this.state = 'error';
      }
    },
  },
};
</script>
