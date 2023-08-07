<script setup>
import { appLocalStorage } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { StoreApp, STORE_CART } from "@/services/stores";
import { formatToVND, onLoadingPageRepeat } from "@/utils/index";

const { userInfo } = appLocalStorage();

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const { onActionGetCarts, onActionAddItemCart } = STORE_CART.StoreCart();

const props = defineProps({
  value: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const onClickAddToCart = async (product_id) => {
  const { user_id, vip } = userInfo?.user_info;
  const res = await onActionAddItemCart({ user_id, product_id, vip });
  if (res.success) onActionGetCarts(user_id);
};

const onClickViewProductDetail = (product_id) => {
  onLoadingPageRepeat(
    ROUTE.name === "ProductDetail",
    onActionLoadingActive,
    ROUTER.push({ name: "ProductDetail", params: { id: product_id } })
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
      <div class="image w-full h-13rem overflow-hidden relative">
        <img
          class="w-full h-full object-fit-cover"
          :src="item?.image"
          alt="Lỗi ảnh"
        />
        <div
          v-if="item?.sale"
          class="bg-main-color absolute bottom-0 py-1 px-2 text-white"
        >
          {{ `Giảm ${item?.sale}` }}
        </div>
      </div>

      <div class="p-2 flex flex-column gap-1">
        <span
          class="line-height-2 on-click-1 fixed-text"
          @click="onClickViewProductDetail(item?.product_id)"
          >{{ item?.name }}</span
        >

        <div class="flex gap-2 align-items-end">
          <span
            v-if="item?.price_sale"
            class="text-800 text-custom-mini line-through"
          >
            {{ formatToVND(item?.price) }}
          </span>

          <span class="p-error"
            >{{
              formatToVND(item?.price_sale ? item?.price_sale : item?.price)
            }}
          </span>
        </div>

        <span style="font-size: 0.8rem">Đã bán {{ item?.sold }}</span>
      </div>

      <div class="px-2 pb-2 align-items-center flex justify-content-between">
        <i
          @click="onClickAddToCart(item?.product_id)"
          class="pi pi-cart-plus text-2xl text-700 on-click-3"
        />
        <span
          @click="onClickViewProductDetail(item?.product_id)"
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
