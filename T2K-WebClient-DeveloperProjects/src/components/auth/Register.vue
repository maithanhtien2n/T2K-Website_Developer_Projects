<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { reactive, ref } from "vue";
import { StoreApp } from "@/services/stores";

const {
  onActionRegisterAccount,
  onActionPopupNotification,
  onActionLoadingActive,
} = StoreApp();

const emits = defineEmits(["onEmitClosePopupAuth"]);

const formRegister = ref(null);

const data = reactive({
  formRegister: {
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    userName: "",
    password: "",
    passwordConfirm: "",
  },
});

const onInputUpdatePassword = (event) => {
  formRegister.value.setFieldValue("password", event.target.value);
};

const onInputUpdatePasswordConfirm = (event) => {
  formRegister.value.setFieldValue("passwordConfirm", event.target.value);
};

const onCheckValidate = () => {
  return Yup.object({
    errors: Yup.string().nullable(),

    fullName: Yup.string().required("Hãy nhập họ và tên"),

    phoneNumber: Yup.string().required("Hãy nhập số điện thoại"),

    dateOfBirth: Yup.string().required("Hãy nhập ngày sinh"),

    gender: Yup.string().required("Hãy chọn giới tính"),

    userName: Yup.string().required("Hãy nhập tên tài khoản"),

    password: Yup.string().required("Hãy nhập mật khẩu"),

    passwordConfirm: Yup.string().required("Hãy nhập mật khẩu xác nhận"),
  });
};

const onClickButtonRegister = (value) => {
  onActionLoadingActive(true);

  onActionRegisterAccount(value, "USER_ACCOUNT")
    .then((res) => {
      if (res.success) {
        onActionPopupNotification({
          display: true,
          title: "Đăng ký tài khoản thành công",
          content1:
            "Xin chúc mừng bạn đã đăng ký thành công tài khoản, hãy đăng nhập để trải nghiệm những chức năng thú vị.",
        });

        emits("onEmitClosePopupAuth");
        setTimeout(() => onActionLoadingActive(false), 1000);
      }
    })
    .catch((error) => {
      onActionLoadingActive(false);
    });
};
</script>

<template>
  <Form
    ref="formRegister"
    class="flex flex-column gap-3"
    :initial-values="data.formRegister"
    :validation-schema="onCheckValidate()"
    @submit="onClickButtonRegister"
  >
    <div class="w-full flex gap-3">
      <Field v-slot="{ field, errorMessage, handleChange }" name="fullName">
        <div class="flex flex-column gap-1">
          <InputText
            class="w-full"
            placeholder="Họ và tên"
            type="text"
            v-model="field.value"
            @update:model-value="handleChange"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>

      <Field v-slot="{ field, errorMessage, handleChange }" name="phoneNumber">
        <div class="flex flex-column gap-1">
          <InputText
            class="w-full"
            type="text"
            v-model="field.value"
            placeholder="Số điện thoại"
            @update:model-value="handleChange"
            onkeydown="
            return (
            event.key >= 0 ||
            event.key == 'Backspace' ||
            event.key == 'Tab');"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>
    </div>

    <div class="w-full flex gap-3">
      <Field v-slot="{ field, errorMessage, handleChange }" name="dateOfBirth">
        <div class="w-full flex-column gap-1">
          <Calendar
            class="w-full"
            v-model="field.value"
            placeholder="Ngày sinh"
            @update:model-value="handleChange"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>

      <Field v-slot="{ field, errorMessage, handleChange }" name="gender">
        <div class="w-full flex-column gap-1">
          <Dropdown
            class="w-full"
            v-model="field.value"
            :options="[
              {
                name: 'Nam',
                code: 'Nam',
              },
              {
                name: 'Nữ',
                code: 'Nữ',
              },
              {
                name: 'Khác',
                code: 'Khác',
              },
            ]"
            optionLabel="name"
            optionValue="code"
            placeholder="Giới tính"
            @update:model-value="handleChange"
          />

          <small v-show="errorMessage" class="p-error ml-1">
            {{ errorMessage }}
          </small>
        </div>
      </Field>
    </div>

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

    <Field
      v-slot="{ field, errorMessage, handleChange }"
      name="passwordConfirm"
    >
      <div class="flex flex-column gap-1">
        <Password
          class="w-full"
          placeholder="Mật khẩu xác nhận"
          :feedback="false"
          toggleMask
          inputClass="w-full"
          @input="onInputUpdatePasswordConfirm"
          v-model="field.value"
          @update:model-value="handleChange"
        />

        <small v-show="errorMessage" class="p-error ml-1">
          {{ errorMessage }}
        </small>
      </div>
    </Field>
    <div class="flex flex-column gap-3">
      <Button label="Đăng ký" type="submit" />

      <div class="text-center">
        Bạn đã có tài khoản?
        <span @click="$emit('onEmitLogin')" class="text-main-color on-click"
          >Đăng nhập</span
        >
      </div>
    </div>
  </Form>
</template>
