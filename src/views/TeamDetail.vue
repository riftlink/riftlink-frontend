<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="state == 'error'">
          <v-row>
            <v-col cols="12">
              <p class="text-center">¡Ups! Hubo un error al recuperar el club. Refresca la página para intentarlo de nuevo.</p>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="state == 'loading'">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </template>
        <template v-else>
          <!-- Back Button -->
          <v-row class="mb-2">
            <v-col cols="12" sm="8" md="6">
              <router-link to="/"><i class="mdi mdi-arrow-left"></i> Volver a clubes</router-link>
            </v-col>
          </v-row>

          <!-- Detail card -->
          <v-card class="mb-3">
            <v-row class="my-3" no-gutters align="center">
              <v-col md="4" lg="3" xl="2">
                <v-card-title>
                  <v-avatar size="128">
                    <v-img cover :src="team.logoUrl" alt="{{ team.teamName }} Logo" />
                  </v-avatar>
                </v-card-title>
              </v-col>
              <v-col>
                <v-card-text>
                  <h2 class="caption">{{ team.teamName }}</h2>
                  <p class="mt-3">
                    <a class="mr-2" :href="twitterUrl" target="_blank" v-if="team.twitterHandle">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-twitter.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="team.discordInvite" target="_blank" v-if="team.discordInvite">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-discord.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="team.websiteLink" target="_blank" v-if="team.websiteLink">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-web.png"
                      ></v-img>
                    </a>
                    <a class="mr-2" :href="linktreeUrl" target="_blank" v-if="team.linktreeHandle">
                      <v-img
                        inline
                        :width="32"
                        src="~/../assets/img/social/ic-linktree.png"
                      ></v-img>
                    </a>
                  </p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>

          <!-- About us -->
          <v-card class="mb-3" v-if="team.aboutUs">
            <v-card-title>Sobre nosotros</v-card-title>
            <v-card-text>
              <p class="pa-2" v-html="markdown.render(team.aboutUs)"></p>
            </v-card-text>
          </v-card>

          <!-- Players -->
          <!-- Header -->
          <v-row class="mt-3 mb-3" justify="center">
            <v-col cols="12">
              <h3>Jugadores</h3>
            </v-col>
          </v-row>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Position
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="player in players"
                :key="player.id"
              >
                <td>?? <!-- TODO: Position --></td>
                <td>
                  <router-link :to="{ name: 'PlayerDetail', params: { id: player.id }}">{{ player.name }}</router-link>
                </td>
                <td>{{ formatRank(player) }} {{ player.leaguePoints }} LP</td>
              </tr>
            </tbody>
          </v-table>
        </template>
      </v-col>
    </v-row>
  </v-container>

  <Alert ref="alert" />
</template>

<script>
import Alert from '@/components/Alert.vue';

import teamsApiClient from "@/services/TeamsApiClient.js"

import { useAuth0 } from '@auth0/auth0-vue';

import MarkdownIt from "markdown-it";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      state: 'loading',
      team: {
        teamName: '',
        logoUrl: '',
        applyContact: '',
        aboutUs: '',
      },
      players: [
        {
          name: "Broken Blade",
          tier: "CHALLENGER",
          rank: "I",
          leaguePoints: 1982
        },
        {
          name: "Yike",
          tier: "CHALLENGER",
          rank: "I",
          leaguePoints: 2001
        },
        {
          name: "Caps",
          tier: "CHALLENGER",
          rank: "I",
          leaguePoints: 5124
        },
        {
          name: "Hans Sama",
          tier: "CHALLENGER",
          rank: "I",
          leaguePoints: 910
        },
        {
          name: "Mikyx",
          tier: "CHALLENGER",
          rank: "I",
          leaguePoints: 1120
        }
      ],
      isAuthenticated: null,
    };
  },
  async created() {
    await this.fetchTeam();
  },
  setup() {
    const markdown = new MarkdownIt()
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return { markdown, isAuthenticated, loginWithRedirect }
  },
  computed: {
    twitterUrl() {
      return 'https://www.twitter.com/' + this.team.twitterHandle
    },
    linktreeUrl() {
      return 'https://www.linktr.ee/' + this.team.linktreeHandle
    },
    shouldShowSocialLinks() {
      return this.team.twitterHandle
          || this.team.linktreeHandle
          || this.team.discordInvite
          || this.team.websiteLink
    }
  },
  methods: {
    async fetchTeam() {
      const teamId = this.$route.params.id
      try {
        const team = await teamsApiClient.fetchTeam(teamId)
        this.team = team;
        this.state = 'ok';
      } catch (error) {
        this.$refs.alert.alertError("¡Ups! Hubo un error al recuperar el club.")
        console.error("Couldn't get team:", error);
        this.state = 'error'
      }
    },
    login() {
      this.loginWithRedirect();
    },
    formatRank(summoner) {
      const formattedRank = summoner.tier.charAt(0).toUpperCase() + summoner.tier.slice(1).toLowerCase()
      if (summoner.tier === "UNRANKED" || summoner.tier === "MASTER" || summoner.tier === "GRANDMASTER" || summoner.tier === "CHALLENGER") {
        return formattedRank
      }
      return formattedRank + " " + summoner.rank
    },
  },
};
</script>
