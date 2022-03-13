<template>
  <form class="d-flex flex-column p-5 m-3">
    <label for="">name</label>
    <input v-model="state.editable.name" type="text" />
    <label for="">picture</label>
    <input v-model="state.editable.picture" type="text" />
    <button type="button" class="btn btn-info" @click="editAccount">
      submit
    </button>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async editAccount() {
        try {
          logger.log("editable before service", state.editable);
          await accountService.editAccount(state.editable);
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