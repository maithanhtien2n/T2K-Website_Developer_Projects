<script setup>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { reactive, watch } from "vue";
import { StoreApp } from "@/services/stores";

const { onActionLoadingActive } = StoreApp();

const props = defineProps(["displayLogin"]);

const emits = defineEmits(["onEmitClosePopupAuth"]);

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

watch(
  () => props.displayLogin,
  (value) => {
    data.display = value;
  }
);

watch(
  () => data.display,
  (value) => {
    if (!value) emits("onEmitClosePopupAuth");
  }
);
</script>

<template>
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
      />

      <Register v-else @onEmitLogin="onClickOpenPopupLogin" />
    </div>
  </Dialog>
</template>
