<script setup>
import { onLoadingPage, userData } from "@/utils";
import { StoreApp, STORE_WAREHOUSE } from "@/services/stores";
import { formatToVND, formatDate } from "@/utils";
import { onMounted, reactive, watch } from "vue";

const { onActionLoadingActive } = StoreApp();

const { onActionGetWarehouses, onGetterWarehouses: warehouses } =
  STORE_WAREHOUSE.StoreWarehouse();

const data = reactive({
  keySearch: "",
  sizeScreen: window.innerWidth,
});

const onHide = () => data.sizeScreen < 750;

onMounted(() => {
  onActionGetWarehouses(userData.value?.user_info?.user_id);
});

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body flex flex-column gap-3">
    <div class="mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Kho hàng</label>

      <span class="search p-input-icon-right w-30rem">
        <i class="pi pi-search" />
        <InputText
          v-model="data.keySearch"
          class="search w-30rem"
          placeholder="Tìm theo tên sản phẩm"
        />
      </span>

      <!-- Danh sách giỏ hàng -->
      <div class="flex card flex-column gap-3 bg-main-left p-3">
        <!-- Header -->
        <div v-if="!onHide()" class="flex flex-column gap-3">
          <div class="header w-full flex card p-2">
            <div class="col-4 flex align-items-center gap-3">
              <div class="font-bold">Sản phẩm đã mua</div>
            </div>
            <div class="col-8 p-0 flex align-items-center">
              <div class="col-5 date font-bold pl-7">Mã đơn hàng</div>
              <div class="col-4 font-bold">Ngày mua</div>
              <div class="col-3 font-bold text-right">Thao tác</div>
            </div>
          </div>
        </div>
        <!-- End header -->

        <div class="relative flex flex-column gap-3">
          <!-- Sản phẩm -->
          <div
            v-if="!warehouses[0]"
            style="min-height: 15rem"
            class="card flex align-items-center justify-content-center"
          >
            Kho hàng của bạn trống.
          </div>

          <div
            v-for="(item, index) in warehouses"
            :key="index"
            class="w-full flex card cart-container relative"
          >
            <div class="cart-item col-4 px-0 flex gap-2 flex">
              <img
                class="w-5rem h-5rem object-fit-cover"
                :src="item?.image"
                alt="Lỗi ảnh"
              />
              <div class="flex flex-column gap-1">
                <span class="w-full line-height-2 fixed-text">
                  {{ item?.name }}
                </span>
                <span class="p-error">{{ formatToVND(item?.price) }}</span>
              </div>
            </div>

            <div class="cart-info col-8 p-0 flex align-items-center">
              <div class="item date col-5 pl-7">
                <span v-show="onHide()">Mã đơn hàng:</span>
                <span>{{ item?.order_code }}</span>
              </div>

              <div class="item col-4">
                <span v-show="onHide()">Ngày mua:</span>
                <span class="text-800">{{ formatDate(item?.created_at) }}</span>
              </div>

              <div class="item col-3 text-right">
                <span v-show="onHide()">Thao tác</span>
                <span class="text-main-color on-click">Xem ngay</span>
              </div>
            </div>
          </div>
          <!-- End sản phẩm -->
        </div>
      </div>
      <!-- End danh sách giỏ hàng -->
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 855px) {
  .date {
    padding-left: 3rem !important;
  }
}

@media only screen and (max-width: 750px) {
  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cart-container {
    flex-wrap: wrap !important;
    gap: 0.7rem;
    padding-bottom: 0.8rem !important;
  }

  .cart-item {
    width: 100% !important;
    padding: 0 !important;
  }

  .cart-info {
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 0.3rem !important;
  }

  .item {
    width: 100% !important;
    padding: 0.2rem 0 !important;
    display: flex;
    justify-content: space-between;
  }

  .pay {
    flex-wrap: wrap;
  }

  .pay .btn {
    width: 100% !important;
  }

  .search {
    width: 100% !important;
  }
}
</style>
