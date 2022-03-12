<template>
  <div class="container">
    <CreatePost v-if="account.id == profile.creatorId" />

    <div
      class="
        col-8
        bg-light
        d-flex
        flex-column
        shadow
        ms-5
        mt-5
        mb-3
        rounded
        posts-card
      "
      v-for="p in posts"
      :key="p.id"
    >
      <!-- <img class="img-fluid" :src="p.imgUrl" alt="" /> -->
      <div>
        <h6>{{ p.body }}</h6>
      </div>
      <div>
        <p>{{ p.creatorId }}</p>
      </div>
      <div class="d-flex align-items-end justify-content-end">
        <DeletePost v-if="account.id == profile.creatorId" />
      </div>
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
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        logger.log("pulling id from route", route.params);
        await profilesService.getProfilePostsById(route.params.id);
        await profilesService.getProfileById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.posts-card {
  height: 30vh;
}
</style>