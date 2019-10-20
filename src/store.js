import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fields: [
      {
        col: 0,
        key: "id",
        label: "Number",
        sortable: true,
        thStyle: "width: 17%"
      },
      {
        col: 1,
        key: "title",
        label: "Title",
        sortable: true,
        thStyle: "width: 50%"
      },
      {
        col: 2,
        key: "author",
        label: "Author",
        sortable: true,
        thStyle: "width: 17%"
      },
      {
        col: 3,
        key: "date",
        label: "Date",
        sortable: true,
        thStyle: "width: 16%"
      }
    ],
    kills: []
  },
  mutations: {
    freshKills: (state, kills) => {
      const killDate = new Date();
      const trophies = kills.map(kill => {
        var trophy = Object.assign({}, kill);
        killDate.setTime(Date.parse(kill.date));
        trophy.date = killDate.toLocaleDateString("en-CA");
        return trophy;
      });
      Vue.set(state, "kills", trophies);
    }
  },
  actions: {
    updateKills: (context, kills) => {
      context.commit("freshKills", kills);
    }
  }
});
