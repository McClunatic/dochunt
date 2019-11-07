<template>
  <b-container fluid class="mt-5">
    <b-table
      striped
      hover
      responsive
      :fields="fields"
      :items="kills"
      :filter="filters"
      :filter-function="filterFunction"
      @filtered="onFiltered"
      :busy="isBusy"
      :per-page="perPage"
      :current-page="currentPage"
      :caption="`Collected ${kills.length} trophies (${killTime} seconds)`"
      caption-top
    >
      <template v-slot:thead-top="data">
        <b-tr>
          <th v-for="field in fields" :key="field.col">
            <b-input-group v-if="field.key === 'date'">
              <v-date-picker v-model="filters[field.key].start">
              </v-date-picker>
              <v-date-picker v-model="filters[field.key].end"></v-date-picker>
            </b-input-group>
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
        :total-rows="filteredRows"
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
  let start = filter.start || new Date(1776, 6, 4);
  let end = filter.start || new Date(3000, 0, 1);
  return entry >= start && entry <= end;
}

function filterNumber(entry, filter) {
  return entry >= filter;
}

export default {
  name: "Trophies",
  data: () => {
    return {
      isBusy: false,
      filters: {
        id: null,
        title: null,
        author: null,
        date: {
          start: null,
          end: null
        },
        similarity: null
      },
      filteredRows: 1,
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
    filterFunction: function(kill, criteria) {
      for (const key of Object.keys(criteria)) {
        if (!(key in kill)) continue;
        if (!criteria[key]) continue;
        let filter =
          key === "date"
            ? filterDate
            : key === "similarity"
            ? filterNumber
            : key === "title"
            ? filterLink
            : filterString;
        if (!filter(kill[key], criteria[key])) {
          console.log(key, kill[key], criteria[key]);
          return false;
        }
      }
      return true;
    },
    onFiltered: function(filteredItems) {
      this.filteredRows = filteredItems.length;
      this.currentPage = 1;
    },
    clear: function(field) {
      Vue.set(this.filters, field, "");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
