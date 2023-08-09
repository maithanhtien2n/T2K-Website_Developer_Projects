<script setup>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { reactive, watch } from "vue";
import { StoreApp } from "@/services/stores";

const { onActionLoadingActive, onGetterDisplayPopupAuth: displayPopupAuth } =
  StoreApp();

const data = reactive({
  title: "Đăng nhập",
  display: false,
});

const onClickOpenPopupRegister = () => {
  onActionLoadingActive(true);
  data.display = false;

  setTimeout(() => {
    data.title = "Đăng ký";
    onActionLoadingActive(false);
    data.display = true;
  }, 1000);
};

const onClickOpenPopupLogin = () => {
  onActionLoadingActive(true);
  data.display = false;

  setTimeout(() => {
    data.title = "Đăng nhập";
    onActionLoadingActive(false);
    data.display = true;
  }, 1000);
};

const onClosePopupAuth = () => {
  data.display = false;
};

const onClickOpenPopupAuth = () => {
  data.display = true;
};

watch(displayPopupAuth, () => {
  data.display = true;
});
</script>

<template>
  <Button
    @click="onClickOpenPopupAuth"
    label="Đăng nhập"
    class="p-button-secondary"
  />

  <Dialog
    v-model:visible="data.display"
    modal
    :header="data.title"
    class="w-30rem"
  >
    <div class="mt-1">
      <Login
        v-if="data.title === 'Đăng nhập'"
        @onEmitCreateNewAccount="onClickOpenPopupRegister"
        @onEmitClosePopupAuth="onClosePopupAuth"
      />

      <Register v-else @onEmitLogin="onClickOpenPopupLogin" />
    </div>
  </Dialog>
</template>
