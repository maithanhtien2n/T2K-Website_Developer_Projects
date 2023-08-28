<script setup>
import { reactive } from "vue";
import { userData, onLoadingPageRepeat } from "@/utils";
import PopupPayment from "./PopupPayment.vue";
import { onLoadingPage, formatToVND } from "@/utils";
import { StoreApp, STORE_CART } from "@/services/stores";
import { useConfirm } from "primevue/useconfirm";
import { useRoute, useRouter } from "vue-router";

const confirm = useConfirm();

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const { onActionGetCarts, onActionRemoveCart, onGetterCarts } =
  STORE_CART.StoreCart();

const data = reactive({
  selectCarts: [],
  selectAllCarts: [],
  sizeScreen: window.innerWidth,
});

const onHide = () => data.sizeScreen < 750;

const onClickCheckAllCart = () => {
  data.selectAllCarts.includes("all")
    ? (data.selectCarts = onGetterCarts.value)
    : (data.selectCarts = []);
};

const onClickCheckCartItem = () => {
  data.selectCarts.length === onGetterCarts.value?.length
    ? (data.selectAllCarts = ["all"])
    : (data.selectAllCarts = []);
};

const totalMoney = () => {
  return data.selectCarts.reduce((price, { money_number }) => {
    return price + money_number;
  }, 0);
};

const onClickViewProductDetail = (product_id) => {
  onLoadingPageRepeat(
    ROUTE.name === "Cart",
    onActionLoadingActive,
    ROUTER.push({ name: "ProductDetail", params: { id: product_id } })
  );
};

const onClickRemoveCart = (key, ids) => {
  confirm.require({
    message: "Bạn có chắc xóa sản phẩm khỏi giỏ hàng?",
    header: "Xác nhận",
    icon: "pi pi-info-circle",
    acceptLabel: "Đồng ý",
    acceptClass: "p-button-danger",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: () => {
      switch (key) {
        case "item":
          onActionRemoveCart(ids).then((res) => {
            if (res.success) {
              onActionGetCarts(userData.value?.user_info?.user_id);
              data.selectCarts = [];
              data.selectAllCarts = [];
            }
          });
          break;
        case "items":
          onActionRemoveCart(ids).then((res) => {
            if (res.success) {
              onActionGetCarts(userData.value?.user_info?.user_id);
              data.selectCarts = [];
              data.selectAllCarts = [];
            }
          });
          break;
      }
    },
    reject: () => {
      //
    },
  });
};

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
    <div class="mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Giỏ hàng</label>

      <!-- Danh sách giỏ hàng -->
      <div class="flex card flex-column gap-3 bg-main-left p-3">
        <!-- Header -->
        <div
          v-if="onHide() && onGetterCarts[0]"
          class="flex align-items-center justify-content-between"
        >
          <div
            class="w-full p-3 bg-white border-round-lg flex align-items-center justify-content-between"
          >
            <div class="flex align-items-center gap-2">
              <Checkbox
                @change="onClickCheckAllCart"
                v-model="data.selectAllCarts"
                value="all"
              />
              <span class="text-main-color on-click"> Chọn tất cả </span>
            </div>

            <div
              @click="
                onClickRemoveCart(
                  'items',
                  data?.selectCarts.map(({ cart_id }) => cart_id)
                )
              "
              :class="{ 'p-disabled': data?.selectCarts?.length < 2 }"
              class="p-error on-click"
            >
              Xóa nhiều
            </div>
          </div>
        </div>

        <div
          v-if="!onHide() && onGetterCarts[0]"
          class="flex flex-column gap-3"
        >
          <div class="header w-full flex card p-2">
            <div class="col-4 flex align-items-center gap-3">
              <div class="font-bold">
                <div class="flex align-items-center gap-2">
                  <Checkbox
                    @change="onClickCheckAllCart"
                    v-model="data.selectAllCarts"
                    value="all"
                  />

                  <span>Chọn tất cả</span>
                </div>
              </div>
            </div>
            <div class="col-8 p-0 flex align-items-center">
              <div class="col-4 font-bold pl-5">Đơn giá</div>
              <div class="col-3 font-bold">Vip</div>
              <div class="col-3 font-bold">Số tiền</div>
              <div
                @click="
                  onClickRemoveCart(
                    'items',
                    data?.selectCarts.map(({ cart_id }) => cart_id)
                  )
                "
                :class="{ 'p-disabled': data?.selectCarts?.length < 2 }"
                class="col-2 font-bold text-right p-error on-click"
              >
                Xóa
              </div>
            </div>
          </div>
        </div>
        <!-- End header -->

        <div class="relative flex flex-column gap-3">
          <!-- Sản phẩm -->
          <div
            v-if="!onGetterCarts[0]"
            style="min-height: 20rem"
            class="card flex align-items-center justify-content-center"
          >
            Giỏ hàng của bạn trống.
          </div>

          <div
            v-for="(item, index) in onGetterCarts"
            :key="index"
            class="w-full flex card cart-container relative"
          >
            <div
              class="cart-item col-4 px-0 flex gap-2 flex align-items-center"
            >
              <Checkbox
                @change="onClickCheckCartItem"
                v-model="data.selectCarts"
                :value="item"
              />
              <img
                class="w-5rem h-5rem object-fit-cover"
                :src="item?.image"
                alt="Lỗi ảnh"
              />
              <div class="h-full">
                <div class="flex flex-column gap-2">
                  <span
                    class="w-full font-bold line-height-2 fixed-text on-click-1"
                    @click="onClickViewProductDetail(item?.product_id)"
                  >
                    {{ item?.name }}</span
                  >
                  <Rating v-model="item.rating" readonly :cancel="false">
                    <template #onicon>
                      <i
                        style="font-size: 0.8rem"
                        class="pi pi-star-fill text-main-color"
                      />
                    </template>
                    <template #officon>
                      <i
                        style="font-size: 0.8rem"
                        class="pi pi-star text-main-color"
                      />
                    </template>
                  </Rating>
                </div>
              </div>
            </div>

            <div class="cart-info col-8 p-0 flex align-items-center">
              <div class="item col-4 pl-5">
                <span v-show="onHide()">Đơn giá: </span>
                <div class="flex align-items-end gap-2 flex-wrap">
                  <span
                    v-if="item?.price_sale"
                    class="line-through text-custom-mini text-600"
                  >
                    {{ formatToVND(item?.price) }}
                  </span>

                  <span class="p-error">
                    {{
                      formatToVND(
                        item?.price_sale ? item?.price_sale : item?.price
                      )
                    }}
                  </span>
                </div>
              </div>

              <div class="item col-3">
                <span v-show="onHide()">VIP:</span>
                <span
                  :class="{
                    'bg-main-color text-white px-2 py-1':
                      item.vip !== 'Không vip',
                  }"
                  class="text-custom-mini border-round-2xl"
                  >{{ item.vip }}</span
                >
              </div>

              <div class="item col-3">
                <span v-show="onHide()">Số tiền:</span>
                <span class="p-error">{{
                  formatToVND(item?.money_number)
                }}</span>
              </div>

              <div
                @click="onClickRemoveCart('item', [item?.cart_id])"
                class="item col-2 text-right"
              >
                <Button
                  v-if="data.sizeScreen > 750"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-outlined p-button-danger p-button-text"
                />

                <Button v-else label="Xóa" class="p-button-danger w-full" />
              </div>
            </div>
          </div>
          <!-- End sản phẩm -->
        </div>

        <!-- Tổng tiền -->
        <div
          v-if="onGetterCarts[0]"
          class="pay card gap-3 p-3 flex align-items-center justify-content-between"
        >
          <div
            class="btn justify-content-between flex align-items-center gap-3"
          >
            <span class="font-bold">Tổng cộng</span>
            <span class="font-bold p-error">{{
              formatToVND(totalMoney())
            }}</span>
          </div>

          <PopupPayment
            :disableButtonPay="data?.selectCarts?.length === 0"
            :payDetail="{
              user_id: userData.user_info?.user_id,
              productsPay: data.selectCarts.map((item) => ({
                product_id: item?.product_id,
                name: item?.name,
                originalPrice: item?.price_sale
                  ? item?.price_sale
                  : item?.price,
                price: item?.money_number,
              })),
              amount: data.selectCarts.length,
              totalMoney: totalMoney(),
            }"
          />
        </div>
        <!-- End tổng tiền -->
      </div>
      <!-- End danh sách giỏ hàng -->
    </div>

    <!-- Sản phẩm liên quan -->
    <CardBody label="Sản phẩm liên quan">
      <CardProducts :value="products" />
    </CardBody>
  </div>

  <ConfirmDialog class="line-height-3" />
</template>

<style scoped>
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
    padding-left: 1.8rem !important;
  }

  .item {
    width: 100% !important;
    padding: 0.2rem 0 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pay {
    flex-wrap: wrap;
  }

  .pay .btn {
    width: 100% !important;
  }
}
</style>
