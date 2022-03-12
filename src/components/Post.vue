<template>
  <router-link :to="{ name: 'Profiles', params: { id: post.creatorId } }">
    <div class="row" @click="setActiveProfile">
      <img :src="post.imgUrl" class="img-fluid" />
      <h2>
        {{ post.body }}
      </h2>
      <p>{{ post.creator.name }} | {{ post.creator.class }} |</p>
      <div class="d-flex justify-content-between">
        <i v-if="account.id" class="mdi mdi-heart-box-outline heart-icon"></i>
        <DeletePost />
        <!-- v-if="account.id == post.creatorId" -->
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      // post: computed(() => AppState.posts),
      setActiveProfile() {
        profilesService.setActiveProfile(props.post);
      },

      async removePost() {
        postsService.removeProfile();
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.posts-card {
  max-height: 25vh;
}

.heart-icon {
  font-size: 36px;
}
</style>