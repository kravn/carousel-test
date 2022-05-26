<template>
  <v-container fluid>
    <v-row dense justify="center" align="center">
      <v-col cols="12">
        <v-card
          class="mb-2"
        >
          <v-carousel
            hide-delimiters
            height="280"
            :interval="interval"
            cycle
            continuous
            reverse
            show-arrows-on-hover>
            <v-carousel-item
              v-for="(item,i) in carousel"
              :key="i"
              :src="item.link"
            >
              <div dark>
                <v-container fill-height>
                  <v-layout align-center>
                    <v-flex>
                      <h3 class="display-3 font-weight-black text-shadowed">{{ item.title }}</h3>
                      <span class="subheading font-weight-bold text-shadowed">{{ item.description}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
        <v-card
          v-for="(section, key) in gameSection"
          :key="key"
          class="game-section mb-2"
          flat>
          <template>

            <GameSlider
              v-if="section.children.length > 0"
              :title="section.name"
              :games="section.children"
              :key-item="key" />

          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import GameSlider from '/components/general/game-slider.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  components: { GameSlider },
  computed: {
    ...mapGetters('carousel', [
      'carousel'
    ]),
    ...mapGetters('games', [
      'games',
      'slotGames',
      'tableGames',
      'featuredGames',
      'newGames'
    ]),
    gameSection () {
      let all = { name: 'all', children: this.games }
      let slot = { name: 'slot', children: this.slotGames }
      let table = { name: 'table', children: this.tableGames }
      let featured = { name: 'featured games', children: this.featuredGames }
      let newGames = { name: 'new games', children: this.newGames }
      let newGames2 = { name: 'new games 2', children: [] }
      
      return [
        { ...featured },
        { ...newGames },
        { ...newGames2 },
        { ...slot },
        { ...table },
        { ...all }
      ]
    }
  },
  async mounted () {
    await this.getCarousel()
    await this.getGames()
  },
  data () {
    return {
      interval: 1000
    }
  },
  methods: {
    ...mapActions('carousel', [
      'getCarousel'
    ]),
    ...mapActions('games', [
      'getGames'
    ])
  }
}
</script>
