<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 home p-2 m-0 flex-column bg-success">
        <h2>SideBar</h2>
      </div>
      <div
        class="
          col-8
          bg-light
          d-flex
          shadow
          ms-5
          mt-5
          mb-3
          rounded
          posts-card
          selectable
        "
        v-for="p in posts"
        :key="p.id"
      >
        <Posts :posts="p" />
      </div>
    </div>
  </div>
</template>



<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>



<style scoped lang="scss">
.home {
  height: 100%;
  margin: 0;

  .home-card {
    width: 25vw;
    max-height: 25%;
    > img {
      height: 200px;
      max-width: 200px;

      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
