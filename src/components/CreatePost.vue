<template>
  <form @submit.prevent="createPost">
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Create Post</label>
      <textarea
        v-model="state.editable.body"
        name="body"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="Create Post..."
      ></textarea>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Post an Image</label>
      <textarea
        v-model="state.editable.imgUrl"
        name="image"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="1"
        placeholder="Post an Image..."
      ></textarea>
    </div>
    <button class="btn btn-success m-2">Create</button>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createPost() {
        try {
          // logger.log("editable before service", state.editable);
          await postsService.createPost(state.editable);
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
</style>