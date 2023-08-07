<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="justify-center">
            <img
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
              alt="Discord Logo"
              height="50"
            />
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              color="primary"
              @click="handleLogin"
            >
              Login con Discord
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useAuth0 } from '@auth0/auth0-vue';
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };
</script>
