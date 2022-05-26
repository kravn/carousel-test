<template>
  <v-row>
    <v-col class="text-center">
      <h1>List of Carousel Images</h1>
      <v-data-table
        :headers="headers"
        :items="carousel"
        :items-per-page="5"
        class="elevation-0"
        light
      >
        <template v-slot:item.image="{ item }">
          <v-img
            :lazy-src="item.link"
            max-height="50"
            max-width="150"
            :src="item.link"
            class="my-1"
            :alt="item.title"
          ></v-img>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CAROUSEL_HEADERS } from '/mixins/headers'
export default {
  name: 'ManageCarousel',
  async mounted () {
    await this.getCarousel()
  },
  computed: {
    ...mapGetters('carousel', [
      'carousel'
    ])
  },
  data () {
    return {
      headers: CAROUSEL_HEADERS
    }
  },
  methods: {
    ...mapActions('carousel', [
      'getCarousel'
    ])
  }
}
</script>
