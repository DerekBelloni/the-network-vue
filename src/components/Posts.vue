<template>
  <div class="row">
    <h2>{{ posts.creator.name }}</h2>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
.posts-card {
  max-height: 25vh;
}
</style>