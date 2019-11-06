<template>
  <b-container fluid class="mt-5">
    <b-table
      striped
      hover
      responsive
      :fields="fields"
      :items="filteredKills"
      :busy="isBusy"
      :per-page="perPage"
      :current-page="currentPage"
      :caption="`Collected ${kills.length} trophies (${killTime} seconds)`"
      caption-top
    >
      <template v-slot:thead-top="data">
        <b-tr>
          <th v-for="field in fields" :key="field.col">
            <v-date-picker
              v-if="field.key === 'date'"
              v-model="filters[field.key]"
              mode="range"
              show-caps
            >
            </v-date-picker>
            <b-input-group v-else>
              <b-form-input
                v-model="filters[field.key]"
                :placeholder="`Filter by ${field.key}`"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  v-if="filters[field.key]"
                  @click="clear(field.key)"
                  type="reset"
                  variant="light"
                >
                  <font-awesome-icon :icon="['fas', 'times']" />
                </b-button>
                <b-button v-else disabled type="reset" variant="light">
                  <font-awesome-icon :icon="['fas', 'times']" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </th>
        </b-tr>
      </template>
      <template v-slot:cell(title)="data">
        <span v-html="data.value.text.link(data.value.href)"></span>
      </template>
      <template v-slot:cell(date)="data">
        {{ data.value.toLocaleDateString("en-CA") }}
      </template>
    </b-table>
    <div class="overflow-auto mt-4">
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </div>
  </b-container>
</template>

<script>
import Vue from "vue";

function filterString(entry, filter) {
  return entry.includes(filter);
}

function filterLink(entry, filter) {
  return entry.text.includes(filter);
}

function filterDate(entry, filter) {
  return entry >= filter.start && entry <= filter.end;
}

function filterNumber(entry, filter) {
  return entry >= filter;
}

export default {
  name: "Trophies",
  data: () => {
    return {
      isBusy: false,
      filters: ["id", "title", "author", "date", "similarity"].reduce(
        (pre, cur) => {
          pre[cur] =
            cur === "date"
              ? { start: new Date(1956, 0, 1), end: new Date() }
              : "";
          return pre;
        },
        {}
      ),
      perPage: 10,
      currentPage: 1,
      killStart: new Date(),
      killEnd: new Date()
    };
  },
  computed: {
    fields: function() {
      return this.$store.state.fields;
    },
    kills: function() {
      return this.$store.state.kills;
    },
    rows: function() {
      return this.$store.state.kills.length;
    },
    killTime: function() {
      return this.killStart < this.killEnd
        ? (this.killEnd - this.killStart) / 1000.0
        : 0.0;
    },
    filteredKills: function() {
      return this.kills.filter(kill => {
        for (const key of Object.keys(this.filters)) {
          if (!(key in kill)) continue;
          if (!this.filters[key]) continue;
          let filter =
            key === "date"
              ? filterDate
              : key === "similarity"
              ? filterNumber
              : key === "title"
              ? filterLink
              : filterString;
          if (!filter(kill[key], this.filters[key])) {
            return false;
          }
        }
        return true;
      });
    }
  },
  created: function() {
    if (this.$route.query.target) {
      this.collectKills();
    }
  },
  watch: {
    $route: function() {
      if (this.$route.query.target) {
        this.collectKills();
      }
    }
  },
  methods: {
    collectKills: function() {
      this.isBusy = true;
      this.killStart = new Date();
      let mode = this.$store.state.mode;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}/${mode}`, {
          params: this.$route.query
        })
        .then(res => {
          this.$store.dispatch("updateKills", res.data);
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("updateKills", []);
        })
        .finally(() => {
          this.killEnd = new Date();
          this.isBusy = false;
        });
    },
    filterFunction: function(row, criteria) {
      const results = criteria.map((elem, col) => {
        if (elem.length === 0) {
          return true;
        }
        const key = this.$store.state.fields.filter(obj => obj.col === col)[0]
          .key;
        try {
          var regex = new RegExp(elem);
          return row[key].match(regex);
        } catch (exc) {
          return row[key].includes(elem);
        }
      });
      return results.every(elem => elem);
    },
    clear: function(field) {
      Vue.set(this.filters, field, "");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
