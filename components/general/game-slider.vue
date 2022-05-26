<template>
  <div>
    <v-card-title
      class="game-section-title headline text-capitalize">
      {{ title }}
      <v-chip
        color="white"
        class="cyan--text p-2 ml-3 font-weight-bold"
        small>
        {{ games.length }}
      </v-chip>
    </v-card-title>
    <v-card-text
      class="px-6">

      <v-row class="slider-container">
        <v-col
          v-for="(game, ikey) in currentItems"
          :key="`${keyItem}-${ikey}`"
          light
          width="200"
          cols="4"
          lg="2"
          md="3"
          sm="3"
          xs="6">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="game-card"
                flat>
                <div class="px-4 pt-2">
                  <v-img
                    :src="game.image"
                    :lazy-src="game.image"
                    :alt="game.name"
                  ></v-img>
                </div>
                <v-card-text
                  class="game-name text-center">
                  {{ game.name }}
                </v-card-text>

                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    color="#036358"
                  >
                    <v-btn color="pink" large>Play Now!</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <div
          v-if="!firstPage"
          class="slider-nav prev-btn">
          <font-awesome-icon
            :icon="['fas', 'caret-left']"
            style="font-size: 60px"
            @click="prevPage" />
        </div>
        <div
          v-if="!lastPage"
          class="slider-nav next-btn">
          <font-awesome-icon
            :icon="['fas', 'caret-right']"
            style="font-size: 60px"
            @click="nextPage" />
        </div>
      </v-row>
      
    </v-card-text>
  </div>
</template>

<script>
  export default {
    name: 'GameSlider',
    props: {
      title: {
        type: String,
        default: ''
      },
      games: {
        type: Array,
        default: () => []
      },
      keyItem: {
        type: [String, Number],
        default: ''
      }
    },
    computed: {
      paginatedItems () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xl':
          case 'lg':
            return 6
          case 'md':
          case 'sm':
            return 4
          case 'xs':
            return 3
          default:
            return 2
        }
      },
      endItem () {
        return (this.page * this.paginatedItems)
      },
      startItem () {
        return (this.endItem - this.paginatedItems) + 1
      },
      currentItems () {
        let items = this.games.filter((key, i) => {
          if (i >= (this.startItem - 1) && i <= (this.endItem - 1)) {
            return key
          }
        })
        return items
      },
      firstPage () {
        return this.page === 1
      },
      lastPage () {
        return this.currentItems.length < this.paginatedItems || this.games.length === this.paginatedItems * this.page
      }
    },
    data () {
      return {
        page: 1
      }
    },
    methods: {
      prevPage () {
        console.log('Previous page....')
        if (this.firstPage) {
          return
        }
        this.page --
      },
      nextPage () {
        console.log('Next page...')
        if (this.lastPage) {
          return
        }
        this.page ++
      }
    },
    watch: {
      'currentItems': {
        handler (val) {
          if (val.length === 0) {
            this.page --
          }
        },
        deep: true
      }
    }
  }
</script>