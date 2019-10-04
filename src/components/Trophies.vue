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
          <b-th>
            <b-form-input
              v-model="numberFilter"
              placeholder="Filter by number"
            ></b-form-input>
          </b-th>
          <b-th>
            <b-form-input
              v-model="authorFilter"
              placeholder="Filter by author"
            ></b-form-input>
          </b-th>
          <b-th>
            <b-form-input
              v-model="subjectFilter"
              placeholder="Filter by subject"
            ></b-form-input>
          </b-th>
          <b-th>
            <b-form-input
              v-model="dateFilter"
              placeholder="Filter by date"
            ></b-form-input>
          </b-th>
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
        { key: "number", label: "Number", sortable: true },
        { key: "author", label: "Author", sortable: true },
        { key: "subject", label: "Subject", sortable: true },
        { key: "date", label: "Date", sortable: true }
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
      numberFilter: "",
      authorFilter: "",
      subjectFilter: "",
      dateFilter: ""
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
