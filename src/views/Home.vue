<script setup>
import Card from '@/components/Card.vue'
import teamsApiClient from "@/services/TeamsApiClient.js"
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
      <!-- Teams -->
      <v-row justify="center" class="mb-3">
        <v-col cols="12" md="8" v-for="team in teams" :key="team.id">
          <Card
            :id="team.id"
            :logo="team.logoUrl"
            :teamName="team.teamName"
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
      teams: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalTeams: 0
    };
  },
  async created() {
    await this.fetchTeams();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalTeams / this.itemsPerPage);
    }
  },
  methods: {
    async fetchTeams() {
      this.state = 'loading'
      try {
        const pagedTeams = await teamsApiClient.fetchActiveTeams(this.currentPage, this.itemsPerPage)
        this.teams = pagedTeams.teams
        this.totalTeams = pagedTeams.total
        this.currentPage = pagedTeams.page
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar los clubes.")
        console.error("Couldn't get teams:", error);
        this.state = 'error'
      }
    },
    onPageChanged(newPage) {
      this.currentPage = newPage
      this.fetchTeams()
    }
  },
};
</script>
