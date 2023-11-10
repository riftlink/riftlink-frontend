<template>
  <v-card>
    <v-row class="my-3" no-gutters align="center">
      <v-col md="4" lg="3" xl="2">
        <v-card-title>
          <v-avatar size="128">
            <v-img cover :src="logo" alt="{{ teamName }} Logo" />
          </v-avatar>
        </v-card-title>
      </v-col>
      <v-col>
        <v-card-text>
          <p class="caption">{{ teamName }}</p>
        </v-card-text>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'OfferDetail', params: { id: id }}">
        <v-btn color="primary">Ver más</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    positionName: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
  }
};
</script>
