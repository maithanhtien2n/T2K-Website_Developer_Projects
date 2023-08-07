<script setup>
import { onLoadingPage } from "@/utils";
import { StoreApp, STORE_WAREHOUSE } from "@/services/stores";
import { formatToVND } from "@/utils";
import { onMounted, reactive, watch } from "vue";

const { onActionLoadingActive } = StoreApp();

const { onActionGetWarehouses, onGetterWarehouses } =
  STORE_WAREHOUSE.StoreWarehouse();

const data = reactive({
  keySearch: "",
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

const products = reactive([
  {
    image:
      "https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image:
      "https://i.ex-cdn.com/mgn.vn/files/content/2021/11/03/toc-goku_1-2117.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image:
      "https://genk.mediacdn.vn/2019/4/2/photo-1-15541780148131777189878.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image: "https://genk.mediacdn.vn/2017/photo-12-1510731176941.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image: "https://genk.mediacdn.vn/2017/photo-12-1510731176941.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image: "https://genk.mediacdn.vn/2017/photo-12-1510731176941.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image: "https://genk.mediacdn.vn/2017/photo-12-1510731176941.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
]);
</script>

<template>
  <div class="container body flex flex-column gap-3">
    <div class="mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Kho hàng</label>

      <div class="flex card flex-column gap-3 bg-main-left p-3">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="data.keySearch"
            class="search w-30rem"
            placeholder="Tìm theo tên sản phẩm"
          />
        </span>

        <div
          v-if="!data?.warehouses[0]"
          style="min-height: 15rem"
          class="card flex align-items-center justify-content-center"
        >
          Kho hàng của bạn trống.
        </div>

        <div class="content-card bg-white flex flex-wrap">
          <div
            v-for="(item, index) in data.warehouses"
            :key="index"
            class="card-container col-4 flex flex-wrap"
          >
            <div class="card-item col-8 py-0 pl-0 flex gap-2">
              <img
                class="w-5rem h-5rem object-fit-cover"
                :src="item?.image"
                alt="Lỗi ảnh"
              />

              <div class="flex flex-column gap-1">
                <span class="font-bold">YZ0112424</span>
                <span class="w-full line-height-2 fixed-text">
                  {{ item?.productName }}
                </span>

                <div class="p-error">
                  {{ formatToVND(item?.price) }}
                </div>
              </div>
            </div>

            <div class="card-item flex col-4 py-0 pl-0 flex-column gap-2">
              <span
                style="background-color: rgb(196, 62, 62)"
                class="w-full text-white text-center py-2 border-round-2xl on-click"
                >Tài liệu</span
              >
              <span
                class="w-full text-white text-center py-2 border-round-2xl bg-main-color on-click"
                >Tải về</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sản phẩm liên quan -->
    <CardBody label="Sản phẩm liên quan">
      <CardProducts :value="products" />
    </CardBody>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 1180px) {
  .card-container {
    width: 50% !important;
  }
}

@media only screen and (max-width: 850px) {
  .card-container {
    width: 100% !important;
    background-color: aliceblue;
  }

  .content-card {
    gap: 1rem !important;
    background-color: transparent !important;
  }
}

@media only screen and (max-width: 750px) {
  .header {
    display: none !important;
  }

  .search {
    width: 100% !important;
  }
}
</style>
