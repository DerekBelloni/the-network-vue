<template>
  <div class="container">
    <h2>{{ profile.body }}</h2>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      profile: computed(() => AppState.activeProfile),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>