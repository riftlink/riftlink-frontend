<script setup>
import Card from '@/components/Card.vue'
import offersApiClient from "@/services/OffersApiClient.js"
</script>

<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Clubes</h2>
      </v-col>
    </v-row>

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
      <!-- Offers -->
      <v-row justify="center" class="mb-3">
        <v-col cols="12" md="8" v-for="offer in offers" :key="offer.id">
          <Card
            :id="offer.id"
            :logo="offer.logoUrl"
            :teamName="offer.teamName"
            >
          </Card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @update:modelValue="onPageChanged"></v-pagination>
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
      totalOffers: 0
    };
  },
  async created() {
    await this.fetchOffers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalOffers / this.itemsPerPage);
    }
  },
  methods: {
    async fetchOffers() {
      this.state = 'loading'
      try {
        const pagedOffers = await offersApiClient.fetchActiveOffers(this.currentPage, this.itemsPerPage)
        this.offers = pagedOffers.offers
        this.totalOffers = pagedOffers.total
        this.currentPage = pagedOffers.page
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar los clubes.")
        console.error("Couldn't get offers:", error);
        this.state = 'error'
      }
    },
    onPageChanged(newPage) {
      this.currentPage = newPage
      this.fetchOffers()
    }
  },
};
</script>
