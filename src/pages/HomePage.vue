<template>
  <div class="container-fluid">
    <div class="row m-2 justify-content-center">
      <div
        v-for="banner in ads"
        :key="banner.id"
        class="col-9 d-flex text-center"
      >
        <Ad :ad="banner" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-3">
        <CreatePost v-if="account.id" />
      </div>
    </div>
    <div class="row">
      <div class="col-6 p-3 m-2">
        <Search />
      </div>
    </div>
    <div class="row">
      <div class="col-4 d-flex justify-content-apart">
        <button class="btn btn-info" @click="changePage(newerPage)">
          Newer Page
        </button>
        <button class="btn btn-info" @click="changePage(olderPage)">
          Older Page
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-8 bg-light d-flex shadow ms-5 mt-5 mb-3 rounded posts-card"
        v-for="p in posts"
        :key="p.id"
      >
        <Post :post="p" />
      </div>
    </div>
    <div class="row m-2 justify-content-center">
      <div
        v-for="banner in ads"
        :key="banner.id"
        class="col-9 d-flex text-center"
      ></div>
    </div>
  </div>
</template>



<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { adsService } from "../services/AdsService";

import CreatePost from "../components/CreatePost.vue";
export default {
  components: { CreatePost },
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
        await adsService.getAds();
        await postsService.changePage(page);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      newerPage: computed(() => AppState.newerPage),
      olderPage: computed(() => AppState.olderPage),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),

      async changePage(page) {
        try {
          await postsService.changePage(page);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
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
