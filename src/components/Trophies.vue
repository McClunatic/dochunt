<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  name: "Trophies",
  data: function() {
    return {
      items: [
        {
          number: "A-1",
          author: "Brian McClune",
          subject: "Very Cool",
          date: new Date(1983, 2, 13)
        },
        {
          number: "A-2",
          author: "Brendan McClune",
          subject: "Still Pretty Good",
          date: new Date(1984, 5, 30)
        },
        {
          number: "A-3",
          author: "Megan McClune",
          subject: "Somehow Also Solid",
          date: new Date(1986, 11, 3)
        }
      ]
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
