<template>
  <v-snackbar
      v-model="visible"
      :color="color"
      variant="elevated"
      location="top end"
      :timeout="5000"
    >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        @click="visible = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      text: '',
      color: ''
    };
  },
  methods: {
    alertSuccess(message) {
      this.text = message
      this.color = 'success'
      this.visible = true
    },
    alertError(message) {
      this.text = message
      this.color = 'error'
      this.visible = true
    },
  },
};
</script>
