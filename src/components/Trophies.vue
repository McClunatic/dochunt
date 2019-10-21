<template>
  <b-container fluid>
    <div class="overflow-auto mt-4">
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
      <h6 class="text-center">Showing 10 trophies per page</h6>
    </div>
    <b-table
      striped
      hover
      responsive
      :fields="fields"
      :items="kills"
      :filter="filters"
      :filter-function="filterFunction"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template v-slot:thead-top="data">
        <b-tr>
          <th v-for="(field, index) in fields" :key="field.col">
            <b-input-group>
              <b-form-input
                v-model="filters[index]"
                :placeholder="'Filter by '.concat(field.key)"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  v-if="filters[index]"
                  @click="clear(index)"
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
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: "Trophies",
  data: () => {
    return {
      filters: ["", "", "", ""],
      perPage: 10,
      currentPage: 1
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
    }
  },
  created: function() {
    this.collectKills();
  },
  watch: {
    $route: function() {
      this.collectKills();
    }
  },
  methods: {
    collectKills: function() {
      const target = this.$route.query.target;
      var targetUrl = null;
      var params = null;
      if (target.startsWith("~")) {
        targetUrl = "http://18.220.121.203:8082/snipe";
        params = { target: target.substr(1) };
      } else {
        targetUrl = "http://18.220.121.203:8081/hunt";
        params = { target: target };
      }
      this.$http
        .get(targetUrl, { params: params })
        .then(res => {
          this.$store.dispatch("updateKills", res.data);
        })
        .catch(err => {
          console.log(err);
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
    clear: function(index) {
      this.filters.splice(index, 1, "");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
