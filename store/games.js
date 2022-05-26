const state = {
  games: []
}

const getters = {
  games: (state) => state.games,
  slotGames: (state) => state.games.filter(game => game.type === 'slot'),
  tableGames: (state) => state.games.filter(game => game.type === 'table'),
  featuredGames: (state) => state.games.filter(game => {
    return game.tags.indexOf('featured') >= 0
  }),
  newGames: (state) => state.games.filter(game => {
    return game.tags.indexOf('new') >= 0
  })
}

const actions = {
  async getGames ({commit}) {
    let res = await this.$axios.get('http://localhost:30001/games')
    commit('onOkGetGames', res.data)
  }
}

const mutations = {
  onOkGetGames: (state, data) => {
    state.games = data
  }
}

export const games = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}