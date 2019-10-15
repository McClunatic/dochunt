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
    kills: [
      {
        id: "A-1",
        author: "Brian McClune",
        title: "Very Cool",
        date: new Date(1983, 1, 13).toLocaleDateString("en-CA")
      },
      {
        id: "A-2",
        author: "Brendan McClune",
        title: "Still Pretty Good",
        date: new Date(1984, 4, 30).toLocaleDateString("en-CA")
      },
      {
        id: "A-3",
        author: "Megan McClune",
        title: "Somehow Also Solid",
        date: new Date(1986, 10, 3).toLocaleDateString("en-CA")
      }
    ]
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
