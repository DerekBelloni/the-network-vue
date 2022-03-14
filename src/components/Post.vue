<template>
  <router-link :to="{ name: 'Profiles', params: { id: post.creatorId } }">
    <div class="row text-center m-2" @click="setActiveProfile">
      <h2>
        {{ post.creator.name }}
      </h2>
      <h2>
        {{ post.body }}
      </h2>
      <img :src="post.imgUrl" class="img-fluid p-2" />

      <div class="d-flex justify-content-between">
        <i
          v-if="account.id"
          class="mdi mdi-heart-box-outline heart-icon"
          @click="likePost(post.id)"
          >{{ post.likes.length }}</i
        >
        <p>
          <b>
            {{ Date(post.createdAt) }}
          </b>
        </p>
        <i
          v-if="account.id == post.creatorId"
          class="mdi mdi-delete-forever heart-icon"
          @click="removePost(post.id)"
        ></i>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
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
      posts: computed(() => AppState.posts),
      profilePosts: computed(() => AppState.profilePosts),

      setActiveProfile() {
        profilesService.setActiveProfile(props.post);
      },

      async likePost() {
        try {
          await postsService.likePost(props.post.id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },

      async removePost() {
        try {
          if (await Pop.confirm("Are you sure?")) {
            postsService.removePost(props.post.id);
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
.posts-card {
  max-height: 25vh;
}

.heart-icon {
  font-size: 36px;
}
</style>