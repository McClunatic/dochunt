<template>
  <b-container fluid>
    <b-table
      striped
      hover
      responsive
      caption-top
      caption="Trophies:"
      :fields="fields"
      :items="items"
    >
      <template v-slot:thead-top="data">
        <b-tr>
          <th v-for="(field, index) in fields" :key="field.id">
            <b-form-input
              v-model="filters[index]"
              :placeholder="'Filter by '.concat(field.key)"
            ></b-form-input>
          </th>
        </b-tr>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: "Trophies",
  data: function() {
    return {
      fields: [
        { id: 0, key: "number", label: "Number", sortable: true },
        { id: 1, key: "author", label: "Author", sortable: true },
        { id: 2, key: "subject", label: "Subject", sortable: true },
        { id: 3, key: "date", label: "Date", sortable: true }
      ],
      items: [
        {
          number: "A-1",
          author: "Brian McClune",
          subject: "Very Cool",
          date: new Date(1983, 1, 13)
        },
        {
          number: "A-2",
          author: "Brendan McClune",
          subject: "Still Pretty Good",
          date: new Date(1984, 4, 30)
        },
        {
          number: "A-3",
          author: "Megan McClune",
          subject: "Somehow Also Solid",
          date: new Date(1986, 10, 3)
        }
      ],
      filters: ["", "", "", ""]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
