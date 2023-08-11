<script setup>
import { reactive } from "vue";
import { formatToVND, vip } from "@/utils";
import { StoreApp, STORE_CART } from "@/services/stores";
import { useRouter } from "vue-router";

const props = defineProps(["payDetail"]);

const ROUTER = useRouter();
const {
  onActionLoadingActive,
  onActionPopupNotification,
  onActionGetUserInfo,
} = StoreApp();

const { onActionPaymentCart, onActionGetCarts } = STORE_CART.StoreCart();

const data = reactive({
  display: false,
});

const onClickPayMent = () => {
  data.display = true;
};

const onClickConfirmPayment = (value) => {
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
</script>

<template>
  <Button
    @click="data.display = true"
    class="btn-item p-button-danger"
    label="Thanh toán ngay"
  />

  <Dialog v-model:visible="data.display" modal class="w-30rem">
    <template #header>
      <span class="font-bold text-2xl text-main-color"
        >Xác nhận thanh toán</span
      >
    </template>

    <div class="w-full flex flex-column gap-3">
      <div class="flex flex-column gap-1">
        <span class="font-bold">Sản phẩm: </span>
        <div
          v-for="(item, index) in props?.payDetail?.productsPay"
          :key="index"
        >
          <span
            v-if="props?.payDetail?.productsPay.length > 1"
            class="line-height-2"
            >-
          </span>

          <span class="line-height-2">
            {{ item?.name }}
            (
            <span class="text-700 text-custom-mini line-through">
              {{ formatToVND(item?.originalPrice) }}
            </span>
            <span> - </span>
            <span class="p-error"> {{ formatToVND(item?.price) }} </span> )
          </span>
        </div>
      </div>

      <div class="flex justify-content-between">
        <span class="font-bold">Ưu đãi giảm giá:</span>
        <span v-if="vip()" class="text-main-color">
          ({{ `Có vip giảm ${vip()}% cho mỗi đơn hàng` }})
        </span>
        <span v-else>Không có vip</span>
      </div>

      <div class="flex justify-content-between">
        <span class="font-bold">Số lượng sản phẩm:</span>
        <span>x {{ props?.payDetail?.amount }}</span>
      </div>

      <div class="flex justify-content-between">
        <span class="font-bold">Tổng số tiền:</span>
        <span class="p-error">
          {{ formatToVND(props?.payDetail?.totalMoney) }}
        </span>
      </div>

      <div class="bg-black-alpha-10 p-2 line-height-2">
        Sau khi bạn ấn xác nhận chúng tôi sẽ gửi sản phẩm vào kho của bạn, hãy
        kiểm tra kho nhé!
      </div>
    </div>

    <template #footer>
      <Button
        @click="data.display = false"
        label="Bỏ qua"
        class="p-button-outlined"
      />
      <Button
        @click="
          onClickConfirmPayment({
            user_id: `${props?.payDetail?.user_id}`,
            products: props?.payDetail.productsPay.map((item) => {
              return {
                product_id: `${item?.product_id}`,
                price: `${item?.price}`,
              };
            }),
            total_money: props?.payDetail?.totalMoney,
          })
        "
        label="Xác nhận"
      />
    </template>
  </Dialog>
</template>

<style scoped>
@media only screen and (max-width: 750px) {
  .btn {
    width: 100% !important;
  }
}

@media only screen and (max-width: 500px) {
  .btn-item {
    width: 100% !important;
  }
}
</style>
