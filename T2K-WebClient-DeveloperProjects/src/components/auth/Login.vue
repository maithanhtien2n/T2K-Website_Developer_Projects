<script setup>
import * as Yup from "yup";
import { reactive, ref } from "vue";
import { Form, Field } from "vee-validate";
import { appLocalStorage } from "@/utils";
import { StoreApp, STORE_CART } from "@/services/stores";
import { updateAuthorizationHeader } from "@/services/api";

const emits = defineEmits(["onEmitClosePopupAuth", "onEmitCreateNewAccount"]);

const {
  onActionLoadingActive,
  onActionLogin,
  onActionGetUserInfo,
  onActionPopupNotification,
} = StoreApp();

const formLogin = ref(null);

const data = reactive({
  formLogin: {
    userName: "",
    password: "",
  },
  display: true,
});

const onInputUpdatePassword = (event) => {
  formLogin.value.setFieldValue("password", event.target.value);
};

const onCheckValidate = () => {
  return Yup.object({
    errors: Yup.string().nullable(),

    userName: Yup.string().required("Hãy nhập tên tài khoản"),

    password: Yup.string().required("Hãy nhập mật khẩu"),
  });
};

const onClickButtonLogin = (value) => {
  onActionLoadingActive(true);
  onActionLogin(value, "USER_ACCOUNT")
    .then((res) => {
      if (res?.success) {
        updateAuthorizationHeader(res?.data?.token);
        onActionGetUserInfo().then((userInfo) => {
          appLocalStorage.value.userData = userInfo;
          appLocalStorage.value.accessToken = res?.data?.token;
        });
        emits("onEmitClosePopupAuth");
        setTimeout(() => onActionLoadingActive(false), 300);
      }
    })
    .catch((error) => {
      onActionLoadingActive(false);

      if (`${error}`.split(":")[1].trim() === "Tài khoản của bạn đã bị khóa!") {
        emits("onEmitClosePopupAuth");
        onActionPopupNotification({
          display: true,
          title: "Tài khoản của bạn đã bị khóa",
          icon: "error",
          content1:
            "Tài khoản của bạn đã bị khóa, vui lòng liên hệ với chúng tôi để mở khóa cho tài khoản của bạn.",
          content2: "Tìm hiểu thêm",
          action: "LoginAdmin",
        });
      }
    });
};
</script>

<template>
  <Form
    ref="formLogin"
    class="flex flex-column gap-3"
    :initial-values="data.formLogin"
    :validation-schema="onCheckValidate()"
    @submit="onClickButtonLogin"
  >
    <Field v-slot="{ field, errorMessage, handleChange }" name="userName">
      <div class="flex flex-column gap-1">
        <InputText
          class="w-full"
          placeholder="Tên tài khoản"
          type="text"
          v-model="field.value"
          @update:model-value="handleChange"
        />

        <small v-show="errorMessage" class="p-error ml-1">
          {{ errorMessage }}
        </small>
      </div>
    </Field>

    <Field v-slot="{ field, errorMessage, handleChange }" name="password">
      <div class="flex flex-column gap-1">
        <Password
          class="w-full"
          placeholder="Mật khẩu"
          :feedback="false"
          toggleMask
          inputClass="w-full"
          @input="onInputUpdatePassword"
          v-model="field.value"
          @update:model-value="handleChange"
        />

        <small v-show="errorMessage" class="p-error ml-1">
          {{ errorMessage }}
        </small>
      </div>
    </Field>
    <div class="flex flex-column gap-3">
      <Button label="Đăng nhập" type="submit" />

      <div class="flex justify-content-between">
        <span @click="emits('onEmitCreateNewAccount')" class="on-click"
          >Tạo tài khoản mới</span
        >
        <span class="on-click">Quên mật khẩu?</span>
      </div>
    </div>
  </Form>
</template>
