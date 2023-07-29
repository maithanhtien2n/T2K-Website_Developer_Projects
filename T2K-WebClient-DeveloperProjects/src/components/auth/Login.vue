<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { reactive } from "vue";

const data = reactive({
  formLogin: {
    userName: "",
    password: "",
  },
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
  console.log(value);
};
</script>

<template>
  <Form
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
        <span @click="$emit('onEmitCreateNewAccount')" class="on-click"
          >Tạo tài khoản mới</span
        >
        <span class="on-click">Quên mật khẩu?</span>
      </div>
    </div>
  </Form>
</template>
