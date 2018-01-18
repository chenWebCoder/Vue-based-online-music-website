export default {
  clickItem ({commit}, argc) {
    commit('clickItem', argc);
  },
  playPrevious ({commit}) {
    commit('playPrevious');
  },
  playOrStop ({commit}) {
    commit('playOrStop');
  },
  playNext ({commit}) {
    commit('playNext');
  },
  playTypesChange ({commit}) {
    commit('playTypesChange');
  },
  getMore ({commit}) {
    commit('getMore');
  }
};
