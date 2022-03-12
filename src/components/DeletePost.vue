<template>
  <div>
    <i
      class="mdi mdi-delete-circle-outline heart-icon selectable"
      @click="deletePost"
    ></i>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      profilePosts = computed(() => AppState.profilePosts)
      async deletePost() {
        try {
          await postsService.deletePost()
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
.heart-icon {
  font-size: 36px;
}
</style>