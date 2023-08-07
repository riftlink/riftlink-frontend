<template>
  <v-card>
    <v-card-title>
      <v-avatar size="64">
        <img :src="logo" alt="Logo" />
      </v-avatar>
      <div>
        <span class="headline">{{ positionName }}</span>
      </div>
    </v-card-title>

    <v-card-subtitle>
      <div>
        <span class="subtitle">{{ teamName }}</span>
      </div>
    </v-card-subtitle>

    <v-card-text>
      <v-row key="rank" class="pa-2">
        <v-col cols="2">
          <!--<v-icon>{{ field.icon }}</v-icon>-->
        </v-col>
        <v-col cols="5">
          <span class="caption">Rank</span>
        </v-col>
        <v-col cols="5">
          <span class="body-1">{{ rank }}</span>
        </v-col>
      </v-row>

      <v-row key="createdAt" class="pa-2">
        <v-col cols="2">
          <!--<v-icon>{{ field.icon }}</v-icon>-->
        </v-col>
        <v-col cols="5">
          <span class="caption">Created at</span>
        </v-col>
        <v-col cols="5">
          <span class="body-1">{{ createdAt }}</span>
        </v-col>
      </v-row>
    </v-card-text>

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
    createdAt: {
      type: String,
      required: true,
    },
  },
};
</script>
