<script setup>
import Card from '@/components/Card.vue'
import offersApiClient from "@/services/OffersApiClient.js"
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" v-for="offer in offers" :key="offer.id">
        <Card
          :id="offer.id"
          :logo="offer.logoUrl"
          :teamName="offer.teamName"
          :positionName="offer.positionName"
          :rank="offer.rank"
          :createdAt="formatDate(offer.createdAt)"
          >
        </Card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn-group>
          <v-btn @click="previousPage" :disabled="currentPage === 1">Anterior</v-btn>
          <v-btn @click="nextPage" :disabled="currentPage === totalPages">Siguiente</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      offers: [],
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  async created() {
    await this.fetchOffers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.offers.length / this.itemsPerPage);
    },
    displayedCards() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.offers.slice(start, end);
    },
  },
  methods: {
    async fetchOffers() {
      try {
        const offers = await offersApiClient.fetchActiveOffers()
        this.offers = offers
      } catch (error) {
        console.error("Error al obtener las ofertas de empleo:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
