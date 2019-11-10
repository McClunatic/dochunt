<template>
  <b-modal
    id="modal-profile"
    size="sm"
    centered
    :title="username.concat('\'s Profile')"
    @show="fetchTags()"
    @ok="syncTags()"
  >
    <b-container fluid>
      <h2>Your Tags</h2>
      <p>
        Select tags of interest to you, and content matching those tags will be
        highlighted in your results!
      </p>
      <b-list-group>
        <b-list-group-item v-for="tag in allTags" :key="tag.id">
          {{ tag.tag }}
          <b-button size="sm" class="float-right" @click="deleteTag(tag)">
            <font-awesome-icon :icon="['fas', 'times']" />
          </b-button>
        </b-list-group-item>
      </b-list-group>
      <b-input-group class="mt-2">
        <b-input-group-prepend>
          <b-button v-if="newTag" @click="addTag" variant="primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </b-button>
          <b-button v-else disabled variant="primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </b-button>
        </b-input-group-prepend>
        <b-form-input
          v-model="newTag"
          v-on:keyup.enter="addTag"
          placeholder="Add new tag"
        ></b-form-input>
      </b-input-group>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "Profile",
  props: ["username"],
  data: () => {
    return {
      loaded: true,
      tags: [],
      tagUpdates: [],
      tagDeletions: [],
      newTag: null
    };
  },
  computed: {
    allTags: function() {
      return !this.loaded
        ? []
        : this.tags
            .concat(this.tagUpdates)
            .filter(tag => !this.tagDeletions.includes(tag));
    }
  },
  methods: {
    addTag: function() {
      let id = Math.max(
        0,
        ...this.tags.concat(this.tagUpdates).map(tg => tg.id)
      );
      if (!this.allTags.map(tg => tg.tag).includes(this.newTag))
        this.tagUpdates.push({ id: id + 1, tag: this.newTag });
      this.newTag = null;
    },
    deleteTag: function(tag) {
      if (this.allTags.includes(tag)) {
        this.tagDeletions.push(tag);
      }
    },
    fetchTags: function() {
      // handle tag fetches
      this.tagUpdates.length = 0;
      this.tagDeletions.length = 0;
      this.loaded = false;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}/profile`)
        .then(res => {
          this.tags = res.data;
        })
        .catch(err => {
          console.log(err);
          this.tags = [];
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    syncTags: function() {
      // handle tag deletions and updates
      this.loaded = false;
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/profile`, {
          delete: this.tagDeletions.map(tag => tag.tag),
          insert: this.tagUpdates.map(tag => tag.tag)
        })
        .then(res => {
          console.log(`response: ${res.data.message}`);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style scoped>
.list-group-item {
  padding: 0.375rem 0.75rem;
}
</style>
