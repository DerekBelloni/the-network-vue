<template>
  <div class="container">
    <div class="row p-2 m-2 justify-content-center bg-info">
      <div v-for="banner in ads" :key="banner.id" class="col-9 text-center">
        <Ad :ad="banner" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <CreatePost v-if="account.id == profile.creatorId" />
      </div>
    </div>
    <div
      class="col-8 bg-light d-flex flex-column shadow ms-5 mt-5 mb-3 rounded"
      v-for="p in posts"
      :key="p.id"
    >
      <Post :post="p" />
      <div>
        <img class="img-fluid" :src="p.imgUrl" alt="" />
      </div>
      <div>
        <h6>{{ p.body }}</h6>
      </div>
      <div></div>
      <div class="d-flex justify-content-end"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { adsService } from "../services/AdsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        logger.log("pulling id from route", route.params);
        await profilesService.getProfilePostsById(route.params.id);
        await profilesService.getProfileById(route.params.id);
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),
      // async removePost() {
      //   if (await Pop.confirm("Are you sure?")) {
      //     await postsService.removePost(p.id);
      //   }
      // },
    };
  },
};
</script>


<style lang="scss" scoped>
.delete-icon {
  font-size: 24px;
}
</style>