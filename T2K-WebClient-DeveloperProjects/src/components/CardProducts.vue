<script setup>
import { formatToVND, onLoadingPageRepeat } from "@/utils/index";
import { ToastService } from "@/utils/toast";
import { useRoute, useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const TOAST = ToastService();

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const props = defineProps({
  value: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const onClickAddToCart = () => {
  TOAST.success("Đã thêm vào giỏ hàng");
};

const onClickViewProductDetail = () => {
  onLoadingPageRepeat(
    ROUTE.name === "ProductDetail",
    onActionLoadingActive,
    ROUTER.push({ name: "ProductDetail", params: { id: 1 } })
  );
};
</script>

<template>
  <div style="gap: 2%" class="flex flex-wrap">
    <div
      v-for="(item, index) in props?.value"
      :key="index"
      style="width: 23.5%; margin-bottom: 1rem"
      class="card-product box-shadow"
    >
      <div class="image w-full h-13rem overflow-hidden">
        <img
          class="w-full h-full object-fit-cover"
          :src="item?.image"
          alt="Lỗi ảnh"
        />
      </div>

      <div class="p-2 flex flex-column gap-1">
        <span
          class="line-height-2 on-click-1"
          @click="onClickViewProductDetail"
          >{{ item?.title }}</span
        >

        <span class="p-error">{{ formatToVND(item?.price) }}</span>

        <span style="font-size: 0.7rem">Đã bán {{ item?.sold }}</span>
      </div>

      <div class="px-2 pb-2 align-items-center flex justify-content-between">
        <i
          @click="onClickAddToCart"
          class="pi pi-cart-plus text-2xl text-700 on-click-3"
        />
        <span
          @click="onClickViewProductDetail"
          class="border-1 text-700 p-2 on-click-2 on-click"
        >
          Xem chi tiết
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  transition: all 0.3s ease;
}
img:hover {
  transform: scale(1.1);
}

@media only screen and (max-width: 900px) {
  .card-product {
    width: 32% !important;
    margin-bottom: 0.8rem !important;
  }
}

@media only screen and (max-width: 650px) {
  .card-product {
    width: 49% !important;
    margin-bottom: 0.5rem !important;
  }

  .image {
    height: 10rem !important;
  }
}
</style>
