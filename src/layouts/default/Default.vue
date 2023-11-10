<template>
  <v-app-bar height="72">
    <v-toolbar-title class=""><img src="/assets/img/logo.png" alt="Riftlink" /></v-toolbar-title>

    <v-btn>
      <template v-slot:prepend>
        <v-icon>mdi-list-box</v-icon>
      </template>
      <router-link to="/">Clubes</router-link>
    </v-btn>

    <v-btn v-if="isAuthenticated">
      <template v-slot:prepend>
        <v-icon>mdi-account</v-icon>
      </template>
      <router-link to="/profile">Mi perfil</router-link>
    </v-btn>

    <v-btn @click="login" v-if="!isAuthenticated">
      <template v-slot:prepend>
        <v-icon>mdi-login</v-icon>
      </template>
      Login
    </v-btn>

    <v-btn @click="logout" v-if="isAuthenticated">
      <template v-slot:prepend>
        <v-icon>mdi-logout</v-icon>
      </template>
      Logout
    </v-btn>

    <v-avatar size="48" class="mr-2" v-if="isAuthenticated">
      <v-img
        alt="Avatar"
        :src="user.picture"></v-img>
    </v-avatar>

  </v-app-bar>

  <!--
  <v-navigation-drawer floating permanent v-model="drawer">
    <v-list>
      <v-list-item>
        <img src="/assets/img/logo.png" alt="Riftlink" />
      </v-list-item>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon>mdi-list-box</v-icon>
        </template>
        <router-link to="/"><v-list-item-title>Clubes</v-list-item-title></router-link>
      </v-list-item>
      <v-list-item v-if="isAuthenticated">
        <template v-slot:prepend>
          <v-icon>mdi-account</v-icon>
        </template>
        <router-link to="/profile"><v-list-item-title>Mi perfil</v-list-item-title></router-link>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-sheet>
        <template v-if="isAuthenticated">
          <v-list>
            <v-list-item>
              <v-avatar size="64">
                <v-img
                  alt="Avatar"
                  :src="user.picture"></v-img>
              </v-avatar>
            </v-list-item>
            <v-list-item>
              <p>{{ user.nickname }}</p>
            </v-list-item>
            <v-list-item>
              <v-btn color="primary" @click="logout" block>
                Logout
              </v-btn>
            </v-list-item>
          </v-list>


        </template>
        <template v-else>
          <v-list>
            <v-list-item>
              <v-btn color="primary" @click="login" block>Login</v-btn>
            </v-list-item>
          </v-list>
        </template>
      </v-sheet>
    </template>

  </v-navigation-drawer>
  -->

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

<style>
</style>
