<script setup>
import { onLoadingPage } from "@/utils";
import { StoreApp, STORE_WAREHOUSE } from "@/services/stores";
import { formatToVND } from "@/utils";
import { onMounted, reactive, watch } from "vue";

const { onActionLoadingActive } = StoreApp();

const { onActionGetWarehouses, onGetterWarehouses } =
  STORE_WAREHOUSE.StoreWarehouse();

const data = reactive({
  warehouses: [],
  sizeScreen: window.innerWidth,
});

watch(onGetterWarehouses, (value) => {
  Object.assign(data.warehouses, [...value]);
});

onMounted(() => {
  onActionGetWarehouses();
});

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body">
    <div class="mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Kho hàng</label>

      <div class="flex card flex-column gap-3 bg-main-left p-3">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="value1"
            class="search w-30rem"
            placeholder="Tìm theo tên sản phẩm"
          />
        </span>

        <div
          v-if="!data?.warehouses[0]"
          style="min-height: 15rem"
          class="card flex align-items-center justify-content-center"
        >
          Giỏ hàng của bạn trống.
        </div>

        <div
          v-for="(item, index) in data.warehouses"
          :key="index"
          class="card card-container flex align-items-center justify-content-between"
        >
          <div class="card-item col-8 p-0 flex gap-2 flex">
            <img
              class="w-5rem h-5rem object-fit-cover"
              :src="item?.image"
              alt="Lỗi ảnh"
            />
            <div class="flex flex-column gap-1">
              <span class="font-bold">YZ192345</span>
              <span class="w-full line-height-2 fixed-text">
                {{ item?.productName }}
              </span>
              <div class="p-error">
                {{ formatToVND(item?.price) }}
              </div>
            </div>
          </div>

          <div class="btn-container col-4 p-0 flex flex-column gap-2">
            <Button class="w-full p-button-danger" label="Xem trước" />
            <Button class="w-full" label="Tải về" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 750px) {
  .header {
    display: none !important;
  }

  .search {
    width: 100% !important;
  }

  .card-container {
    flex-direction: column;
    gap: 1rem !important;
  }

  .card-item,
  .btn-container {
    width: 100% !important;
  }
}
</style>
