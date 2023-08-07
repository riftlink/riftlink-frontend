<template>
  <v-container>
    <h1>Ofertas</h1>
    <template v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <!-- Save Button -->
      <v-row justify="end">
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
            <td>{{ offer.active ? 'Yes' : 'No' }}</td>
            <td>
              <router-link :to="{ name: 'OfferDetail', params: { id: offer.id }}">Ver</router-link> |
              <router-link :to="{ name: 'AdminEditOffer', params: { id: offer.id }}">Editar</router-link>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </v-container>
</template>

<script>
import offersApiClient from "@/services/OffersApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  data() {
    return {
      loading: true,
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
      } catch (error) {
        console.error("Error al obtener las ofertas de empleo:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
