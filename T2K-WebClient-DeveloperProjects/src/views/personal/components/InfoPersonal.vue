<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { onMounted, reactive, ref, watch } from "vue";
import { StoreApp, STORE_PERSONAL } from "@/services/stores";
import {
  onRenderStringBase64,
  formatDate,
  isValidPhoneNumber,
  isValidName,
} from "@/utils";

const {
  onActionLoadingActive,
  onActionGetUserInfo,
  onGetterUserInfo: userInfo,
} = StoreApp();

const { onActionSaveInfoPersonal } = STORE_PERSONAL.StorePersonal();

const formInfoPersonal = ref(null);

const data = reactive({
  formInfoPersonal: {
    avatar: {
      name: "",
      base64: "",
    },
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  },
});

const onCheckValidate = () => {
  return Yup.object({
    errors: Yup.string().nullable(),

    fullName: Yup.string()
      .nullable()
      .required("Hãy nhập họ và tên")
      .test("fullName", "Vui lòng nhập đúng định dạng tên", (value) =>
        isValidName(value)
      ),

    phoneNumber: Yup.string()
      .nullable()
      .required("Hãy nhập số điện thoại")
      .test(
        "phoneNumber",
        "Vui lòng nhập đúng định dạng số điện thoại",
        (value) =>
          value.length >= 10 && value.length <= 12 && isValidPhoneNumber(value)
      ),

    dateOfBirth: Yup.string().nullable().required("Hãy nhập ngày sinh"),

    gender: Yup.string().nullable().required("Hãy chọn giới tính"),
  });
};

const onUploadFile = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile.size > 3145728) {
    formInfoPersonal.value.setFieldError(
      "avatar",
      "Dung lượng ảnh không được vượt quá 3MB."
    );
    return;
  } else {
    formInfoPersonal.value.setFieldError("avatar", null);
  }

  if (selectedFile.type.split("/")[0] !== "image") {
    formInfoPersonal.value.setFieldError(
      "avatar",
      "Tệp bạn chọn không phải là ảnh."
    );
    return;
  } else {
    formInfoPersonal.value.setFieldError("avatar", null);
  }

  if (selectedFile) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (event) => {
      formInfoPersonal.value.setFieldValue("avatar", {
        name: selectedFile.name,
        base64: event.target.result,
      });
    };
  } else {
    console.error("Không có tệp được chọn.");
  }
};

const onClickSaveInfoPersonal = (value) => {
  onActionSaveInfoPersonal(value).then(async (res) => {
    if (res.success) await onActionGetUserInfo();
  });
};

const onUpdateData = (value) => {
  formInfoPersonal.value.resetForm({
    values: Object.assign(data.formInfoPersonal, {
      ...[value.user_info].map((item) => ({
        user_id: item?.user_id,
        avatar: {
          name: item?.image
            .split("_")
            .filter((_, index) => index !== 0)
            .join("_"),
          base64: item?.image,
        },
        fullName: item?.full_name,
        phoneNumber: item?.phone_number,
        dateOfBirth: new Date(item?.day_of_birth),
        gender: item?.gender,
      }))[0],
    }),
  });
};

watch(userInfo, (value) => {
  onUpdateData(value);
});

onMounted(() => {
  onUpdateData(userInfo.value);
});
</script>

<template>
  <Form
    ref="formInfoPersonal"
    class="flex flex-column gap-3"
    :initial-values="data.formInfoPersonal"
    :validation-schema="onCheckValidate()"
    @submit="onClickSaveInfoPersonal"
  >
    <div class="flex gap-3 container-info">
      <!-- Thông tin -->
      <div class="info col-6 p-0 flex flex-column gap-3">
        <label class="flex gap-2">
          <span>Tên đăng nhập:</span>
          <span class="font-bold">{{ userInfo?.user_name }}</span>
        </label>

        <Field v-slot="{ field, errorMessage, handleChange }" name="fullName">
          <div class="flex flex-column gap-1">
            <label class="flex flex-column gap-2">
              <span>Họ và tên</span>
              <InputText
                class="w-full"
                placeholder="Họ và tên"
                type="text"
                v-model="field.value"
                @update:model-value="handleChange"
              />
            </label>

            <small v-show="errorMessage" class="p-error ml-1">
              {{ errorMessage }}
            </small>
          </div>
        </Field>

        <Field
          v-slot="{ field, errorMessage, handleChange }"
          name="phoneNumber"
        >
          <div class="flex flex-column gap-1">
            <label class="flex flex-column gap-2">
              <span>Số điện thoại</span>
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
            </label>

            <small v-show="errorMessage" class="p-error ml-1">
              {{ errorMessage }}
            </small>
          </div>
        </Field>

        <div class="flex gap-2">
          <Field
            v-slot="{ field, errorMessage, handleChange }"
            name="dateOfBirth"
          >
            <div class="w-full flex-column gap-1">
              <label class="flex flex-column gap-2 pb-1">
                <span>Ngày sinh</span>
                <Calendar
                  class="w-full"
                  v-model="field.value"
                  placeholder="Ngày sinh"
                  dateFormat="dd/mm/yy"
                  @update:model-value="handleChange"
                />
              </label>

              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>

          <Field v-slot="{ field, errorMessage, handleChange }" name="gender">
            <div class="w-full flex-column">
              <label class="flex flex-column gap-2 pb-1">
                <span>Giới tính</span>
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
              </label>
              <small v-show="errorMessage" class="p-error ml-1">
                {{ errorMessage }}
              </small>
            </div>
          </Field>
        </div>
      </div>

      <!-- Ảnh đại diện -->
      <div class="avatar-img col-6 p-0">
        <Field v-slot="{ field, errorMessage }" name="avatar">
          <div class="text-center flex gap-3 flex-column align-items-center">
            <img
              class="w-7rem h-7rem object-fit-cover border-circle box-shadow-1"
              :src="field.value.base64 || '../../../public/images/avatar.jpg'"
              alt="Lỗi ảnh"
            />
            <div>
              <label
                for="fileInput"
                class="custom-file-upload bg-black-alpha-30"
              >
                <span>Chọn ảnh</span>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                @change="onUploadFile"
                style="display: none"
              />
            </div>

            <small v-show="errorMessage" class="p-error ml-1">
              {{ errorMessage }}
            </small>
          </div>
        </Field>
      </div>
    </div>

    <div class="w-full flex justify-content-end gap-2">
      <Button label="Bỏ qua" size="small" outlined />
      <Button label="Lưu" type="submit" size="small" />
    </div>
  </Form>
</template>

<style scoped>
.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}

/* Ẩn tên tệp tin */
.custom-file-upload input[type="file"] {
  display: none;
}

@media only screen and (max-width: 700px) {
  .info {
    width: 100% !important;
  }

  .avatar-img {
    width: 100% !important;
  }

  .container-info {
    flex-wrap: wrap-reverse !important;
  }
}
</style>
