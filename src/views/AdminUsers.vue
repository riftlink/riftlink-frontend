<template>
  <v-container>
    <h1>Usuarios</h1>
    <template v-if="state == 'error'">
      <v-row>
        <v-col cols="12">
          <p class="text-center">¡Ups! Hubo un error al recuperar los usuarios. Refresca la página para intentarlo de nuevo.</p>
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
              SummonerName
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>{{ user.id }}</td>
            <td>{{ user.summonerName }}</td>
            <td>
              <a href="#" @click="refreshSummoner(user.id)"><v-icon>mdi-refresh</v-icon></a>
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

import usersApiClient from "@/services/UsersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      users: [],
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const users = await usersApiClient.listAllUsers(accessToken)
        this.users = users;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar los usuarios.")
        console.error("Couldn't get users:", error);
        this.state = 'error';
      }
    },
    async refreshSummoner(userId) {
      const accessToken = await this.getAccessTokenSilently()
      try {
        await usersApiClient.refreshSummoner(accessToken, userId)
        this.$refs.alert.alertSuccess("El summoner del usuario se refrescó correctamente.")
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al refrescar el summoner del usuario.")
        console.error("Couldn't refresh summoner:", error);
      }
    },
  },
};
</script>
