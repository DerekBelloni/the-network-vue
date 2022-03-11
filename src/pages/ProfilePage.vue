<template>
  <div class="container">
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
      <h6>{{ p.body }}</h6>
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
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>