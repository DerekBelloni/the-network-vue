<template>
  <router-link :to="{ name: 'Profiles', params: { id: post.creatorId } }">
    <div class="row" @click="setActiveProfile">
      <img :src="post.imgUrl" class="img-fluid" />
      <h2>
        {{ post.body }}
      </h2>
      <p>{{ post.creator.name }} | {{ post.creator.class }} |</p>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      setActiveProfile() {
        profilesService.setActiveProfile(props.post);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.posts-card {
  max-height: 25vh;
}
</style>