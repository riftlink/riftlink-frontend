<script setup>
import Card from '@/components/Card.vue'
import offersApiClient from "@/services/OffersApiClient.js"
</script>

<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Ofertas</h2>
      </v-col>
    </v-row>

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
      <!-- Offers -->
      <v-row justify="center">
        <v-col cols="12" md="8" v-for="offer in offers" :key="offer.id">
          <Card
            :id="offer.id"
            :logo="offer.logoUrl"
            :teamName="offer.teamName"
            :positionName="offer.positionName"
            :rank="offer.rank"
            :createdAt="offer.createdAt"
            >
          </Card>
        </v-col>
      </v-row>
    </template>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
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
        const offersPaged = await offersApiClient.fetchActiveOffers()
        this.offers = offersPaged.offers
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar las ofertas.")
        console.error("Couldn't get offers:", error);
        this.state = 'error'
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
