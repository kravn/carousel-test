<template>
  <v-row>
    <v-col class="text-center">
      <h1>List of Games</h1>
      <v-data-table
        :headers="headers"
        :items="games"
        :items-per-page="25"
        class="elevation-0"
        light
      >
        <template v-slot:item.image="{ item }">
          <v-img
            :lazy-src="item.image"
            max-height="50"
            max-width="50"
            :src="item.image"
            class="my-1"
            :alt="item.name"
          ></v-img>
        </template>
        <template v-slot:item.tags="{ item }">
          <v-chip
            v-for="tag in item.tags"
            :key="tag"
            class="ma-0 pa-0 px-2 mr-1"
            dark
            :color="`${tag === 'new' ? 'green' : 'red accent-3'}`"
            x-small
          >
            {{ tag }}
          </v-chip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GAMES_HEADERS } from '/mixins/headers'
export default {
  name: 'ManageGames',
  async mounted () {
    await this.getGames()
  },
  computed: {
    ...mapGetters('games', [
      'games'
    ])
  },
  data () {
    return {
      headers: GAMES_HEADERS
    }
  },
  methods: {
    ...mapActions('games', [
      'getGames'
    ])
  }
}
</script>
