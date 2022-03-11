<template>
  <div class="container">
    <img :src="ad.banner" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>