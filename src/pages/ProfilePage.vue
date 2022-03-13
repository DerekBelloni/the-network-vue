<template>
  <div class="container">
    <div class="row p-2 m-2 justify-content-center">
      <div v-for="banner in ads" :key="banner.id" class="col-9 text-center">
        <Ad :ad="banner" />
      </div>
    </div>
    <div class="row">
      <EditProfile v-if="account.id == profile.id" />
    </div>
    <div class="row container-fluid bg-dark p-2 justify-content-center">
      <div class="col-12 mt-3 mb-0 text-center">
        <div class="d-flex justify-content-center profile-img">
          <img :src="profile.picture" alt="" class="img-fluid" />
        </div>
        <h1>{{ profile.name }}</h1>
        <h3>{{ profile.email }}</h3>
      </div>
      <div></div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <CreatePost v-if="account.id == profile.id" />
      </div>
    </div>
    <div
      class="
        col-8
        bg-light
        d-flex
        flex-column
        align-items-center
        justify-content-center
        shadow
        ms-2
        mt-2
        mb-2
        rounded
      "
      v-for="p in posts"
      :key="p.id"
    >
      <div class="d-flex justify-content-end">
        <Post :post="p" />
      </div>
    </div>
    <div class="row p-2 m-2 justify-content-center">
      <div
        v-for="banner in ads"
        :key="banner.id"
        class="col-9 text-center"
      ></div>
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
import EditProfile from "../components/EditProfile.vue";
export default {
  components: { EditProfile },
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        logger.log("pulling id from route", route.params);
        await profilesService.getProfilePostsById(route.params.id);
        await profilesService.getProfileById(route.params.id);
        await adsService.getAds();
        await postsService.converTimeStamp();
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
      async removePost() {
        try {
          if (await Pop.confirm("Are you sure?")) {
            await postsService.removePost(AppState.posts.id);
          }
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
.delete-icon {
  font-size: 24px;
}

.profile-img {
  max-height: 250px;
  max-width: 250px;
}

.ad-card {
  max-height: 15vh;
}
</style>