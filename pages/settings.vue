<template>
  <div>
    <div
      class="pa-2 mb-2"
      light
      flat>
      <v-btn
        depressed
        dark
        :color="`${btnDisabled('settings-carousel') ? 'blue lighten-3' : 'blue darken-1'}`"
        @click="$router.push('/settings/carousel')"
      >
        Carousel
      </v-btn>
      <v-btn
        depressed
        dark
        :color="`${btnDisabled('settings-games') ? 'blue lighten-3' : 'blue darken-1'}`"
        @click="$router.push('/settings/games')"
      >
        Games
      </v-btn>
    </div>

    <NuxtChild  />

  </div>
</template>

<script>
  export default {
    name: 'SettingsPage',
    mounted () {
      this.$router.push('/settings/carousel')
    },
    computed: {
      routeName () {
        return this.$route.name
      }
    },
    methods: {
      btnDisabled (key = '') {
        if (key !== this.routeName) {
          return
        }
        switch (key) {
          case 'settings-carousel':
            return true
          case 'settings-games':
            return true
          default:
            return false
        }
      }
    },
    watch: {
      '$route': {
        handler (val) {
          if (val.name === 'settings') {
            this.$router.push('/settings/carousel')
          }
        },
        deep: true
      }
    }
  }
</script>