<script setup>
import { formatToVND, userData, vip } from "@/utils";
import { reactive, onMounted } from "vue";
import { StoreApp, STORE_PRODUCT, STORE_CART } from "@/services/stores";
import { onLoadingPage } from "@/utils";
import PopupPayment from "./components/PopupPayment.vue";
import Evaluate from "./components/Evaluate.vue";
import { useRoute, useRouter } from "vue-router";

const ROUTE = useRoute();

const ROUTER = useRouter();

const {
  onActionLoadingActive,
  onActionGetUserInfo,
  onActionPopupNotification,
} = StoreApp();

const { onActionGetProductDetail, onGetterProductDetail: productDetail } =
  STORE_PRODUCT.StoreProduct();

const { onActionGetCarts, onActionAddItemCart, onActionPaymentCart } =
  STORE_CART.StoreCart();

const onUpdateProductDetail = () => {
  onActionGetProductDetail(ROUTE.params.id);
};

const onClickAddToCart = async (product_id) => {
  const { user_id, vip } = userData?.value?.user_info;
  const res = await onActionAddItemCart({ user_id, product_id, vip });
  if (res.success) onActionGetCarts(user_id);
};

const onClickPayNow = (value) => {
  onActionLoadingActive(true);
  onActionPaymentCart(value)
    .then(async (res) => {
      if (res.success) {
        data.display = false;
        await onActionGetUserInfo();
        await onActionGetCarts(props?.payDetail?.user_id);
        ROUTER.push({ name: "Home" });
        onActionPopupNotification({
          display: true,
          title: "Thanh toán thành công",
          content1:
            "Bạn đã thanh toán thành công đơn hàng của mình, vui lòng kiểm tra kho hàng để trải nghiệm sản phẩm.",
          content2: "Tiếp tục mua hàng",
          action: "Products",
        });
      }
    })
    .catch((error) => {
      onActionLoadingActive(false);
    });
};

onMounted(() => {
  onActionGetProductDetail(ROUTE.params.id);
});

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
]);

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body flex flex-column gap-3">
    <!-- Chi tiết sản phẩm -->
    <div class="mt-3 card flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Chi tiết sản phẩm</label>

      <div class="body-detail flex">
        <!-- Left -->
        <div class="col-left col-5 h-20rem p-0">
          <img
            style="object-fit: contain"
            class="w-full h-full card"
            :src="productDetail?.image"
            alt=""
          />
        </div>

        <!-- Right -->
        <div class="col-right col-7 p-3 flex flex-column gap-3">
          <span class="title font-bold text-2xl text-main-color">
            {{ productDetail?.name }}
          </span>

          <div class="flex gap-3 text-700">
            <span class="flex gap-1">
              <i class="pi pi-star-fill text-main-color" />
              {{ productDetail?.total_evaluate }}
            </span>
            <span>|</span>
            <span>{{ productDetail?.amount_evaluate }} đánh giá</span>
            <span>|</span>
            <span>{{ productDetail?.sold }} đã bán</span>
          </div>

          <div class="flex gap-3 bg-black-alpha-10 p-3">
            <span
              v-if="productDetail?.price_sale"
              class="line-through text-800"
            >
              {{ formatToVND(productDetail?.price) }}
            </span>

            <div class="flex flex-column gap-2">
              <div class="flex align-items-center gap-3">
                <span class="text-2xl font-bold p-error">
                  {{
                    formatToVND(
                      productDetail?.price_sale
                        ? productDetail?.price_sale
                        : productDetail?.price
                    )
                  }}
                </span>
                <span
                  v-if="productDetail?.sale"
                  style="padding-top: 0.3rem !important"
                  class="bg-main-color p-1 px-2 text-white text-custom-mini border-round-2xl"
                >
                  {{ productDetail?.sale }}
                </span>
              </div>
              <div
                class="text-main-color font-bold flex align-items-center gap-1"
              >
                <span class="on-click">Đăng ký gói vip</span>
                <div
                  v-tooltip.top="'Đăng ký gói vip để nhận được nhiều ưu đãi.'"
                >
                  <i class="pi pi-question-circle" />
                </div>
              </div>
            </div>
          </div>

          <div class="btn-action flex gap-3">
            <Button
              @click="onClickAddToCart(productDetail.product_id)"
              class="btn-item"
              label="Thêm vào giỏ hàng"
            />

            <!-- Thanh toán ngay -->
            <PopupPayment
              :payDetail="{
                user_id: `${userData?.user_info?.user_id}`,
                productsPay: [{ ...productDetail }].map((item) => ({
                  product_id: `${item?.product_id}`,
                  name: item?.name,
                  originalPrice: productDetail?.price_sale
                    ? productDetail?.price_sale
                    : productDetail?.price,
                  price: `${
                    productDetail?.price_sale
                      ? productDetail?.price_sale -
                        (productDetail?.price_sale * vip()) / 100
                      : productDetail?.price -
                        (productDetail?.price * vip()) / 100
                  }`,
                })),
                amount: 1,
                totalMoney: productDetail?.price_sale
                  ? productDetail?.price_sale -
                    (productDetail?.price_sale * vip()) / 100
                  : productDetail?.price - (productDetail?.price * vip()) / 100,
              }"
            />
          </div>
        </div>
      </div>

      <div class="border-top-1 text-300 pt-3 mt-2 flex flex-column gap-1">
        <span class="font-bold text-800">Mô tả sản phẩm</span>

        <div
          v-html="productDetail?.description"
          class="line-height-3 text-800"
        />
      </div>
    </div>

    <!-- Sản phẩm liên quan -->
    <CardBody label="Sản phẩm liên quan">
      <CardProducts :value="products" />
    </CardBody>

    <!-- Đánh giá của người dùng -->
    <Evaluate
      :value="{
        total_evaluate: productDetail?.total_evaluate,
        evaluate: productDetail?.evaluate || [],
        amount_evaluate: productDetail?.amount_evaluate,
      }"
      @onEmitUpdateProductDetail="onUpdateProductDetail"
    />
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .body-detail {
    flex-wrap: wrap;
  }

  .col-left {
    width: 100% !important;
  }

  .col-right {
    width: 100% !important;
    padding: 0 !important;
    padding-top: 1rem !important;
  }
}

@media only screen and (max-width: 500px) {
  .btn-action {
    flex-wrap: wrap !important;
  }

  .btn-item {
    width: 100% !important;
  }

  .col-left {
    height: 15rem !important;
  }

  .title {
    font-size: 1.3rem !important;
  }
}
</style>
