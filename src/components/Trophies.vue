<template>
  <b-container fluid>
    <b-table
      striped
      hover
      responsive
      caption-top
      caption="Trophies:"
      :fields="fields"
      :items="kills"
      :filter="filters"
      :filter-function="filterFunction"
    >
      <template v-slot:thead-top="data">
        <b-tr>
          <th v-for="(field, index) in fields" :key="field.id">
            <b-input-group>
              <b-form-input
                v-model="filters[index]"
                :placeholder="'Filter by '.concat(field.key)"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="reset" v-if="filters[index]">
                  <font-awesome-icon :icon="['fas', 'times']" />
                </b-button>
                <b-button variant="reset" v-else disabled>
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
  props: ["kills"],
  data: function() {
    return {
      fields: [
        { id: 0, key: "number", label: "Number", sortable: true },
        { id: 1, key: "author", label: "Author", sortable: true },
        { id: 2, key: "subject", label: "Subject", sortable: true },
        { id: 3, key: "date", label: "Date", sortable: true }
      ],
      filters: ["", "", "", ""]
    };
  },
  methods: {
    filterFunction: function(row, criteria) {
      const results = criteria.map((elem, index) => {
        if (elem.length === 0) {
          return true;
        }
        const key = this.fields.filter(obj => obj.id === index)[0].key;
        try {
          var regex = new RegExp(elem);
          return row[key].match(regex);
        } catch (exc) {
          return row[key].includes(elem);
        }
      });
      return results.every(elem => elem);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
