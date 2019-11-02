import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
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
    setUser: (state, user) => {
      state.user = user;
    },
    clearUser: state => {
      state.user = null;
    },
    freshKills: (state, kills) => {
      console.log("fresh kills: ", kills);
      const killDate = new Date();
      const trophies = kills.map(kill => {
        var trophy = Object.assign({}, kill);
        killDate.setTime(Date.parse(kill.date));
        trophy.date = killDate.toLocaleDateString("en-CA");
        trophy.title = kill.title.link(kill.href);
        if (kill.similarity) trophy.similarity = kill.similarity.toFixed(8);
        return trophy;
      });

      Vue.set(state, "kills", trophies);

      const newFields = state.fields.slice();
      if (trophies.length > 0 && trophies[0].similarity) {
        newFields[3].thStyle = "width: 8%";
        newFields[4] = {
          col: 4,
          key: "similarity",
          label: "Similarity",
          sortable: true,
          thStyle: "width: 8%"
        };
      } else {
        newFields[3].thStyle = "width: 16%";
        newFields.length = 4;
      }

      Vue.set(state, "fields", newFields);
    }
  },
  actions: {
    login: (context, user) => {
      context.commit("setUser", user);
    },
    logout: context => {
      context.commit("clearUser");
    },
    updateKills: (context, kills) => {
      context.commit("freshKills", kills);
    }
  }
});
