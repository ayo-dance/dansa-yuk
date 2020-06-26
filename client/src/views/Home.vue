<template>
  <v-card tile height="100%" color="blue">
    <v-card-title>
      <h1>Let's Dance. Move your body finger!</h1>
    </v-card-title>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Let's Play
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">Enter Your Name</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Username*"
                    v-model="username"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="login()">Login</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    username: '',
  }),
  methods: {
    login() {
      this.$store.dispatch('playerLogin', this.username);
      this.$router.push('wait');
    },
  },
};
</script>

<style></style>
