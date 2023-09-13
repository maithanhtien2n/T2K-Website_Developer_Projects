<script setup>
import { reactive } from "vue";
import { appLocalStorage } from "@/utils";
import { StoreApp } from "@/services/stores";
import Loading from "@/components/common/Loading.vue";
import { updateAuthorizationHeader } from "@/services/api";
import { useRoute, useRouter } from "vue-router";

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive, onActionLogin, onActionGetUserInfo } =
  StoreApp();

const data = reactive({
  formLogin: {
    userName: "",
    password: "",
  },

  validate: {
    userName: "",
    password: "",
  },
});

const onValidateUserName = () => {
  if (!data.formLogin.userName) {
    data.validate.userName = "Vui lòng nhập tên tài khoản";
  } else {
    data.validate.userName = "";
  }
};

const onValidatePassword = () => {
  if (!data.formLogin.password) {
    data.validate.password = "Vui lòng nhập mật khẩu";
  } else {
    data.validate.password = "";
  }
};

const onInputUpdatePassword = (event) => {
  onValidatePassword();
  data.formLogin.password = event.target.value;
};

const onValidate = () => {
  onValidateUserName();
  onValidatePassword();
};

const onValidateStop = () => {
  for (const item in data.validate) {
    if (data.validate[item]) {
      return true;
    }
  }
  return false;
};

const onClickLoginWebAdmin = () => {
  onValidate();
  if (onValidateStop()) {
    return;
  }

  onActionLoadingActive(true);
  onActionLogin(data.formLogin, "ADMIN_ACCOUNT")
    .then((res) => {
      if (res?.success) {
        updateAuthorizationHeader(res?.data?.token);
        onActionGetUserInfo().then((userInfo) => {
          appLocalStorage.value.userData = userInfo;
          appLocalStorage.value.accessToken = res?.data?.token;
        });
        ROUTER.push({ name: "HomeAdmin" });
        setTimeout(() => onActionLoadingActive(false), 300);
      }
    })
    .catch(() => {
      onActionLoadingActive(false);
    });
};
</script>
<template>
  <Loading />
  <Toast class="toast w-21rem line-height-2" position="top-left" />

  <div class="flex justify-content-center align-items-center h-screen">
    <div class="flex flex-column gap-4 align-items-center">
      <div class="font-bold text-2xl text-main-color">
        Đăng nhập vào hệ thống
      </div>
      <div class="card w-23rem flex flex-column gap-3 py-4">
        <label class="flex flex-column gap-2">
          <span>Tài khoản</span>
          <div class="flex flex-column gap-1">
            <InputText
              v-model="data.formLogin.userName"
              class="w-full"
              @blur="onValidateUserName"
              @input="onValidateUserName"
              @keydown.enter="onClickLoginWebAdmin"
            />
            <small v-show="data.validate.userName" class="p-error ml-1">
              {{ data.validate.userName }}
            </small>
          </div>
        </label>

        <label class="flex flex-column gap-2">
          <span>Mật khẩu</span>
          <div class="flex flex-column gap-1">
            <Password
              class="w-full"
              :feedback="false"
              toggleMask
              inputClass="w-full"
              autocomplete="new-password"
              @input="onInputUpdatePassword"
              @blur="onValidatePassword"
              v-model="data.formLogin.password"
              @keydown.enter="onClickLoginWebAdmin"
            />
            <small v-show="data.validate.password" class="p-error ml-1">
              {{ data.validate.password }}
            </small>
          </div>
        </label>

        <Button label="Đăng nhập" @click="onClickLoginWebAdmin" />
      </div>
    </div>
    <div
      class="fixed bottom-0 w-full py-3 flex justify-content-center gap-2 align-items-center box-shadow"
    >
      <div class="text-600 gap-1">
        <span class="text-custom-mini">
          Xin lỗi, nhưng hãy đừng cố gắng truy cập trái phép vào hệ thống này.
          Chúng tôi đánh giá rất cao tính bảo mật và tính riêng tư của dữ liệu.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
