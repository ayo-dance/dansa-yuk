<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Create New Room
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">New Room</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  v-model="gamePlay.name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="gamePlay.password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  label="Duration*"
                  v-model="gamePlay.duration"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  label="Max. Player*"
                  v-model="gamePlay.maxPlayer"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    gamePlay: {
      name: '',
      password: '',
      duration: 0,
      maxPlayer: 0,
    },
  }),
};
</script>
