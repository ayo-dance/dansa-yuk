<template>
  <v-card tile height="100%" color="blue">
    <v-card-title>
      <h1>Welcome, {{ this.$store.state.username }}</h1>
    </v-card-title>
    <v-card-subtitle>
      <h2>You can join or create room on your own</h2>
    </v-card-subtitle>
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
                    label="Room Name*"
                    v-model="room.name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    v-model="room.password"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    type="number"
                    label="Duration*"
                    v-model="room.duration"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    type="number"
                    label="Max. Player*"
                    v-model="room.maxPlayer"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="createRoom()"
              >Create</v-btn
            >
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card v-for="room in rooms" :key="room.id">
      <v-card-title>
        {{ room.name }}
      </v-card-title>
    </v-card>

    <!-- for all avaible room-->
  </v-card>
</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex';

const socket = io('http://localhost:3000');

export default {
  data: () => ({
    dialog: false,
    room: {
      name: '',
      password: '',
      duration: 0,
      maxPlayer: 0,
    },
  }),
  methods: {
    createRoom() {
      this.dialog = false;
      this.$store.dispatch('createRoom', this.room);
    },
  },
  created() {},
  computed: mapState(['rooms']),
};
</script>

<style></style>
