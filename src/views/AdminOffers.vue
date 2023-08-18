<template>
  <v-container>
    <h1>Ofertas</h1>
    <template v-if="state == 'error'">
      <v-row>
        <v-col cols="12">
          <p class="text-center">¡Ups! Hubo un error al recuperar las ofertas. Refresca la página para intentarlo de nuevo.</p>
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
          <router-link to="/admin/offers/new"><v-btn block color="primary">Nueva oferta</v-btn></router-link>
        </v-col>
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Team
            </th>
            <th class="text-left">
              Position
            </th>
            <th class="text-left">
              Rank
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
            v-for="offer in offers"
            :key="offer.id"
          >
            <td>{{ offer.teamName }}</td>
            <td>{{ offer.positionName }}</td>
            <td>{{ offer.rank }}</td>
            <td>
              <template v-if="offer.active">
                <v-icon>mdi-check</v-icon>
              </template>
              <template v-else>
                -
              </template>
            </td>
            <td>
              <router-link :to="{ name: 'OfferDetail', params: { id: offer.id }}"><v-icon>mdi-eye</v-icon></router-link>&nbsp;
              <router-link :to="{ name: 'AdminEditOffer', params: { id: offer.id }}"><v-icon>mdi-pencil</v-icon></router-link>
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

import offersApiClient from "@/services/OffersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      offers: [],
    };
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    }
  },
  async created() {
    await this.fetchOffers();
  },
  methods: {
    async fetchOffers() {
      const accessToken = await this.getAccessTokenSilently()
      try {
        const offers = await offersApiClient.fetchAllOffers(accessToken)
        this.offers = offers;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar las ofertas.")
        console.error("Couldn't get offers:", error);
        this.state = 'error';
      }
    },
  },
};
</script>
