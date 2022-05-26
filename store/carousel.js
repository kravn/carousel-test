const state = {
  carousel: []
}

const getters = {
  carousel: (state) => state.carousel
}

const actions = {
  async getCarousel ({commit}) {
    let res = await this.$axios.get('http://localhost:30001/carousel-images')
    commit('onOkGetCarousel', res.data)
  }
}

const mutations = {
  onOkGetCarousel: (state, data) => {
    state.carousel = data
  }
}

export const carousel = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}