<template>
  <form class="form-group row" @submit.prevent="search">
    <input
      v-model="searchTerm"
      type="text"
      class="col-9"
      placeholder="search...."
    />
    <button class="btn btn-outline-primary col-lg-3 col-6">search</button>
  </form>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { computed, reactive, onMounted, ref } from "vue";
export default {
  setup() {
    const searchTerm = ref("");

    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAll({ query: searchTerm.value });
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>