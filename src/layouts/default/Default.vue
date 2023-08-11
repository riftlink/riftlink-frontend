<template>
  <v-navigation-drawer v-model="drawer">
    <v-toolbar flat>
      <v-toolbar-title>Riftlink</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </template>
        <router-link to="/"><v-list-item-title>Ofertas</v-list-item-title></router-link>
      </v-list-item>
      <v-list-item v-if="isAuthenticated">
        <template v-slot:prepend>
          <v-icon>mdi-send</v-icon>
        </template>
        <router-link to="/profile"><v-list-item-title>Mi perfil</v-list-item-title></router-link>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-sheet
        color="grey-lighten-4"
        class="pa-4"
      >
        <template v-if="isAuthenticated">
          <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          >
            <v-img
              alt="Avatar"
              :src="user.picture"></v-img>
          </v-avatar>

          <div>{{ user.nickname }}</div>

          <div class="pa-2">
            <v-btn @click="logout" block>
              Logout
            </v-btn>
          </div>
        </template>
        <template v-else>
          <div class="pa-2">
            <v-btn @click="login" block>Login</v-btn>
          </div>
        </template>
      </v-sheet>
    </template>

  </v-navigation-drawer>

  <v-main>
    <default-view />
  </v-main>
</template>

<script>
import DefaultView from './View.vue'

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    DefaultView
  },
  data() {
    return {
      drawer: null
    }
  },
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return { loginWithRedirect, logout, user, isAuthenticated }
  },
  methods: {
    login() {
      this.loginWithRedirect();
    },
    logout() {
      this.logout({ logoutParams: { returnTo: window.location.origin }})
    }
  }
}
</script>
