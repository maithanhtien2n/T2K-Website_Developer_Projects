<script setup>
import { formatDate } from "@/utils";
import { ToastService } from "@/utils/toast";
import { onMounted, reactive, watch } from "vue";
import { STORE_ACCOUNT } from "@/services/stores";

const TOAST = ToastService();

const props = defineProps(["infoUser"]);

const emits = defineEmits(["onEmitResetTableSelection"]);

const {
  onActionGetAccounts,
  onActionGetAccountsOption,
  onActionRechargeAccount,
  onGetterAccountsOption: accountsOption,
} = STORE_ACCOUNT.StoreAccount();

const data = reactive({
  body: {
    account_id: "",
    depositAmount: null,
  },
  userInfo: {},
  display: false,
});

const onClickOpenPopupRecharge = () => {
  if (props.infoUser.length > 1) {
    TOAST.error("Chức năng chỉ cho phép nạp mỗi lần 1 tài khoản!");
    return;
  }
  emits("onEmitResetTableSelection");
  data.display = true;
};

const onInputDepositAmount = ({ value }) => {
  data.body.depositAmount = value;
};

const onClickRecharge = async () => {
  const res = await onActionRechargeAccount(data.body);
  if (res.success) {
    data.display = false;
    data.body = {
      account_id: "",
      depositAmount: null,
    };
    onActionGetAccounts({ status: "ACTIVE" });
  }
};

watch(
  () => data.display,
  (value) => {
    if (value) {
      if (props.infoUser[0]) {
        data.body.account_id = props.infoUser[0];
      } else {
        data.body = {
          account_id: "",
          depositAmount: null,
        };
      }
    } else {
      data.body = {
        account_id: "",
        depositAmount: null,
      };
    }
  }
);

watch(
  () => data.body.account_id,
  (value) => {
    if (value) {
      data.userInfo = accountsOption.value.find(({ code }) => code === value);
    }
  }
);

onMounted(() => {
  onActionGetAccountsOption({ status: "ACTIVE" });
});
</script>

<template>
  <Button label="Nạp tiền" size="small" @click="onClickOpenPopupRecharge" />

  <Dialog v-model:visible="data.display" modal class="w-30rem">
    <template #header>
      <span class="font-bold text-custom-1 text-main-color">
        Nạp tiền cho khách hàng
      </span>
    </template>

    <div class="flex flex-column gap-3">
      <label class="flex flex-column gap-2">
        <span class="font-bold">
          Tên khách hàng
          <span class="p-error font-normal text-custom-mini">
            (Trường bắt buộc)*
          </span>
        </span>
        <Dropdown
          v-model="data.body.account_id"
          :options="accountsOption"
          optionLabel="name"
          optionValue="id"
          :filter="true"
          :filterFields="['name', 'nameWithoutAccents', 'code']"
          :autoFilterFocus="true"
          :resetFilterOnHide="true"
          :filterInputProps="{ maxlength: 30 }"
          filterPlaceholder="Nhập tên tài khoản cần tìm"
          emptyMessage="Không tìm thấy dữ liệu"
          emptyFilterMessage="Không tìm thấy dữ liệu"
          placeholder="Chọn khách hàng cần nạp"
          class="w-full"
        >
          <template #option="slotProps">
            <div class="p-dropdown-car-option">
              <span>
                {{ `${slotProps.option.code} - ${slotProps.option.name}` }}
              </span>
            </div>
          </template>
        </Dropdown>
      </label>

      <div v-if="data.body.account_id" class="flex flex-column gap-3">
        <div class="flex flex-column gap-2">
          <span class="font-bold">Thông tin khách hàng</span>
          <div
            class="flex flex-column gap-2 bg-black-alpha-10 border-round-lg p-3"
          >
            <span>Điện thoại: {{ data.userInfo?.phone_number }}</span>
            <span>
              Ngày sinh: {{ formatDate(data.userInfo?.day_of_birth) }}
            </span>
            <span>Giới tính: {{ data.userInfo?.gender }}</span>
            <span>Số dư hiện tại: {{ data.userInfo?.account_money }}</span>
          </div>
        </div>

        <label class="flex flex-column gap-2">
          <span class="font-bold">
            Số tiền nạp
            <span class="p-error font-normal text-custom-mini">
              (Trường bắt buộc)*
            </span>
          </span>
          <InputNumber
            v-model="data.body.depositAmount"
            class="w-full"
            placeholder="Ví dụ: 100.000đ"
            locale="vi-VN"
            @input="onInputDepositAmount"
          />
        </label>
      </div>
    </div>

    <template #footer>
      <Button
        @click="data.display = false"
        label="Bỏ qua"
        class="p-button-outlined"
      />
      <Button
        label="Nạp tiền"
        autofocus
        :disabled="!data.body.account_id || !data.body.depositAmount"
        @click="onClickRecharge"
      />
    </template>
  </Dialog>
</template>
