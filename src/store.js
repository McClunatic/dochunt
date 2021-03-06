import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export function createStore(initialState) {
  return new Vuex.Store({
    state: {
      user: initialState.user,
      status: initialState.status,
      token: initialState.token,
      fields: initialState.fields,
      kills: initialState.kills,
      tags: initialState.tags,
      numFields: initialState.fields.length
    },
    mutations: {
      authenticated: (state, { token, user }) => {
        state.user = user;
        state.token = token;
        state.status = "authenticated";
      },
      denied: state => {
        state.status = "denied";
      },
      unauthenticated: state => {
        state.user = null;
        state.token = null;
        state.status = null;
      },
      kills: (state, kills) => {
        const trophies = kills.map(kill => {
          let trophy = Object.assign({}, kill);
          trophy.date = new Date(kill.date);
          trophy.tags = kill.tags.split(",");
          state.fields.forEach(field => {
            if ("tagKey" in field) {
              trophy[field.key] = {
                text: kill[field.key],
                href: kill[field.tagKey]
              };
            }
          });
          return trophy;
        });

        Vue.set(state, "kills", trophies);

        const newFields = state.fields.slice();
        if (trophies.length > 0 && trophies[0].similarity) {
          newFields[state.numFields] = {
            col: state.numFields,
            key: "similarity",
            label: "Similarity",
            sortable: true,
            thStyle: "width: 1%"
          };
        } else {
          newFields.length = state.numFields;
        }

        Vue.set(state, "fields", newFields);
      },
      tags: (state, tags) => {
        Vue.set(state, "tags", tags);
      }
    },
    actions: {
      login: (context, promise) => {
        return promise
          .then(res => {
            localStorage.setItem("token", res.data.token);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token}`;
            context.commit("authenticated", {
              token: res.data.token,
              user: res.data.user
            });
            return res;
          })
          .catch(err => {
            context.commit("denied");
            throw err;
          });
      },
      register: (context, promise) => {
        return new Promise((resolve, reject) => {
          promise
            .then(res => {
              localStorage.setItem("token", res.data.token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.token}`;
              console.log(res.data.user);
              context.commit("authenticated", {
                token: res.data.token,
                user: res.data.user
              });
              resolve(res);
            })
            .catch(err => {
              localStorage.removeItem("token");
              context.commit("denied");
              reject(err);
            });
        });
      },
      logout: context => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        context.commit("unauthenticated");
      },
      updateKills: (context, kills) => {
        context.commit("kills", kills);
      },
      updateTags: (context, tags) => {
        context.commit("tags", tags);
      }
    }
  });
}
