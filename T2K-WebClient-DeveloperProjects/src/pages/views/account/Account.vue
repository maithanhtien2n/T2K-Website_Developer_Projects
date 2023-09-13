<script setup>
import { ToastService } from "@/utils/toast";
import PopupRecharge from "./PopupRecharge.vue";
import { useConfirm } from "primevue/useconfirm";
import { formatDate, formatToVND } from "@/utils";
import { STORE_ACCOUNT } from "@/services/stores";
import { computed, onMounted, reactive, ref } from "vue";

const TOAST = ToastService();

const confirm = useConfirm();

const { onActionGetAccounts, onActionUpdateStatus, onGetterAccounts } =
  STORE_ACCOUNT.StoreAccount();

const data = reactive({
  tabIndex: 0,
  body: {
    pagination: {
      first: 0,
      rows: 5,
      sort: null,
    },
    keySearch: "",
  },
  tableSelection: [],
});

const tabs = [
  {
    title: "Tất cả",
    content: "Thông tin hồ sơ",
  },
  {
    title: "Đang hoạt động",
    content: "Nội dung",
  },
  {
    title: "Đã khóa",
    content: "Nội dung",
  },
];

const accounts = computed(() => onGetterAccounts.value);

const onShowButton = (code) => {
  switch (data.tabIndex) {
    case 0:
      return ["unlock", "lock"].includes(code);
    case 1:
      return ["recharge", "lock"].includes(code);
    case 2:
      return ["unlock"].includes(code);
  }
};

const onMapTableSelection = (field) => {
  return data.tableSelection.map((item) => item[field]);
};

const onDisableButton = (code) => {
  return !onMapTableSelection("status_code").includes(code);
};

const onStatus = () => {
  switch (data.tabIndex) {
    case 0:
      return "";
    case 1:
      return "ACTIVE";
    case 2:
      return "LOCK";
  }
};

const onUpdateDataAccounts = () => {
  onActionGetAccounts({
    status: onStatus(),
    key_search: data.body.keySearch,
  });
};

const onTabChange = () => {
  data.body.keySearch = "";
  data.tableSelection = [];
  onUpdateDataAccounts();
};

const onClickSearch = () => {
  if (data.body.keySearch) onUpdateDataAccounts();
};

const onClickActionButton = (action) => {
  if (
    onMapTableSelection("status_code").includes(
      action === "unlock" ? "ACTIVE" : "LOCK"
    )
  ) {
    TOAST.error(
      `Vui lòng chỉ chọn dòng dữ liệu có trạng thái: ${
        action === "unlock" ? "Đã khóa" : "Hoạt động"
      }`
    );
    return;
  }

  const ids = onMapTableSelection("account_id");

  confirm.require({
    message: `Bạn muốn ${action === "unlock" ? "mở khóa" : "khóa"} tài khoản?`,
    header: "Xác nhận",
    icon: "pi pi-info-circle",
    acceptLabel: "Đồng ý",
    acceptClass: "p-button-danger",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: async () => {
      const res = await onActionUpdateStatus({
        account_id: ids,
        status: action === "unlock" ? "ACTIVE" : "LOCK",
      });

      if (res.success) {
        data.tableSelection = [];
        onUpdateDataAccounts();
      }
    },
    reject: () => {
      //
    },
  });
};

onMounted(() => {
  onActionGetAccounts();
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <label class="text-custom-1 font-bold">Tài khoản người dùng</label>

    <TabView v-model:activeIndex="data.tabIndex" @tab-change="onTabChange">
      <TabPanel v-for="(tab, index) in tabs" :key="index" :header="tab.title">
        <DataTable
          :paginator="true"
          v-model:selection="data.tableSelection"
          :value="accounts"
          :first="data.body.pagination.first"
          :rows="data.body.pagination.rows"
          :rowsPerPageOptions="[5, 10, 15, 20]"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
        >
          <template #header>
            <div class="flex justify-content-between">
              <div class="flex gap-2">
                <PopupRecharge
                  v-if="onShowButton('recharge')"
                  :infoUser="onMapTableSelection('account_id')"
                  @onEmitResetTableSelection="data.tableSelection = []"
                />

                <Button
                  v-show="onShowButton('unlock')"
                  label="Mở khóa"
                  :disabled="onDisableButton('LOCK')"
                  @click="onClickActionButton('unlock')"
                />

                <Button
                  v-show="onShowButton('lock')"
                  label="Khóa"
                  class="p-button-danger"
                  :disabled="onDisableButton('ACTIVE')"
                  @click="onClickActionButton('lock')"
                />
              </div>

              <span class="p-input-icon-left w-20rem">
                <i
                  :class="{ 'p-disabled': !data.body.keySearch }"
                  class="pi pi-search on-click"
                  @click="onClickSearch"
                />
                <InputText
                  v-model="data.body.keySearch"
                  placeholder="Tìm theo tên tài khoản"
                  size="small"
                  class="w-full"
                  @keypress.enter="onClickSearch"
                />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" class="max-w-5rem w-5rem" />

          <Column
            field="user_code"
            header="Mã người dùng"
            headerClass="white-space-nowrap"
            style="min-width: 7rem"
            :sortable="true"
          />

          <Column
            field="full_name"
            header="Họ và tên"
            headerClass="white-space-nowrap"
            style="min-width: 13rem"
            :sortable="true"
          />

          <Column
            field="user_name"
            header="Tên người dùng"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          />

          <Column
            field="phone_number"
            header="Điện thoại"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          />

          <Column
            field="day_of_birth"
            header="Ngày sinh"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span>{{ formatDate(data?.day_of_birth) }}</span>
            </template>
          </Column>

          <Column
            field="gender"
            header="Giới tính"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          />

          <Column
            field="account_money"
            header="Số dư"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span>{{ formatToVND(data?.account_money) }}</span>
            </template>
          </Column>

          <Column
            field="created_at"
            header="Ngày tạo"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span>{{ formatDate(data?.created_at) }}</span>
            </template>
          </Column>

          <Column
            field="status_code"
            header="Trạng thái"
            headerClass="white-space-nowrap"
            style="min-width: 10rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <StatusComponent :code="data?.status_code" />
            </template>
          </Column>

          <template #empty>
            <div class="flex justify-content-center">
              Không tìm thấy kết quả nào
            </div>
          </template>
        </DataTable>
      </TabPanel>
    </TabView>
  </div>

  <ConfirmDialog class="line-height-3" />
</template>
