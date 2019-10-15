import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fields: [
      { col: 0, key: "id", label: "Number", sortable: true },
      { col: 1, key: "title", label: "Title", sortable: true },
      { col: 2, key: "author", label: "Author", sortable: true },
      { col: 3, key: "date", label: "Date", sortable: true }
    ],
    kills: []
  },
  mutations: {
    freshKills: (state, kills) => {
      Vue.set(state, "kills", [...kills]);
    }
  },
  actions: {
    updateKills: (context, kills) => {
      context.commit("freshKills", kills);
    }
  }
});
