<template>
  <div class="container ad">
    <img class="img-fluid" :src="ad.banner" alt="" />
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
.ad {
  max-height: 20vh;
}
</style>