<template>
  <form class="d-flex flex-column p-5 m-3">
    <label for="">name</label>
    <input v-model="editable.name" type="text" placeholder="name..." />
    <label for="">picture</label>
    <input v-model="editable.picture" type="text" placeholder="picture..." />
    <label for="">bio</label>
    <input v-model="editable.bio" type="text" placeholder="bio..." />
    <label for="">email</label>
    <input v-model="editable.email" type="text" placeholder="email..." />
    <label for="">LinkedIn</label>
    <input v-model="editable.linkedin" type="text" placeholder="LinkedIn..." />
    <label for="">Github</label>
    <input v-model="editable.github" type="text" placeholder="Github..." />
    <button type="button" class="btn btn-info m-2" @click="editAccount">
      submit
    </button>
  </form>
</template>



<script>
import { reactive, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      async editAccount() {
        try {
          logger.log("editable before service", editable.value);
          await accountService.editAccount(editable.value);
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