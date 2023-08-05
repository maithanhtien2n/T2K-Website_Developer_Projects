<script setup>
import { formatToVND } from "@/utils";
import { reactive } from "vue";

const data = reactive({
  selectCart: [],
  sizeScreen: window.innerWidth,
});

const onHide = () => data.sizeScreen < 750;
</script>

<template>
  <div class="flex card flex-column gap-3 bg-main-left p-3">
    <div
      v-if="onHide()"
      class="flex align-items-center justify-content-between"
    >
      <span class="text-white on-click">Chọn tất cả</span>
      <Checkbox v-model="data.selectCart" value="1" />
    </div>

    <div class="header w-full flex card p-2">
      <div class="col-4 flex align-items-center gap-3">
        <Checkbox v-model="data.selectCart" value="2" />
        <span class="font-bold">Sản phẩm</span>
      </div>
      <div class="col-8 p-0 flex align-items-center">
        <div class="col-3 font-bold">Đơn giá</div>
        <div class="col-3 font-bold">Vip</div>
        <div class="col-3 font-bold">Số tiền</div>
        <div class="col-3 font-bold text-right">Thao tác</div>
      </div>
    </div>

    <div class="relative flex flex-column gap-3">
      <div class="w-full flex card cart-container relative">
        <div class="cart-item col-4 px-0 flex gap-2 flex align-items-center">
          <Checkbox v-model="data.selectCart" value="3" />
          <img
            class="w-5rem h-5rem object-fit-cover"
            src="https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg"
            alt=""
          />
          <div class="flex flex-column gap-2">
            <span class="w-full line-height-2 fixed-text">
              Sản phẩm số 1 hàng đầu Việt Nam dg gdsgs gds</span
            >
            <Rating v-model="rating" :cancel="false">
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

        <div class="cart-info col-8 p-0 flex align-items-center">
          <div class="item col-3">
            <span v-show="onHide()">Đơn giá: </span>
            <span class="line-through text-custom-mini text-600">{{
              formatToVND(500000)
            }}</span>
            {{ formatToVND(350000) }}
          </div>
          <div class="item col-3">
            <span v-show="onHide()">VIP:</span> N O V I P
          </div>
          <div class="item col-3 p-error">
            <span v-show="onHide()">Số tiền:</span> {{ formatToVND(350000) }}
          </div>
          <div class="item col-3 text-right">
            <i
              v-if="data.sizeScreen > 750"
              class="delete pi pi-trash p-error on-click"
            />
            <Button v-else label="Xóa" class="p-button-danger w-full" />
          </div>
        </div>
      </div>

      <div class="w-full flex card cart-container relative">
        <div class="cart-item col-4 px-0 flex gap-2 flex align-items-center">
          <Checkbox v-model="data.selectCart" value="4" />
          <img
            class="w-5rem h-5rem object-fit-cover"
            src="https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg"
            alt=""
          />
          <div class="flex flex-column gap-2">
            <span class="w-full line-height-2 fixed-text">
              Sản phẩm số 1 hàng đầu Việt Nam dg gdsgs gds</span
            >
            <Rating v-model="rating" :cancel="false">
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

        <div class="cart-info col-8 p-0 flex align-items-center">
          <div class="item col-3">
            <span v-show="onHide()">Đơn giá: </span>
            <span class="line-through text-custom-mini text-600">{{
              formatToVND(500000)
            }}</span>
            {{ formatToVND(350000) }}
          </div>
          <div class="item col-3 flex align-items-center gap-1">
            <span v-show="onHide()">VIP:</span>
            <span
              style="height: 1.2rem"
              class="w-5rem flex align-items-center justify-content-center text-white text-custom-mini bg-main-color border-round-3xl"
            >
              Giảm 20%
            </span>
          </div>
          <div class="item col-3 p-error">
            <span v-show="onHide()">Số tiền:</span> {{ formatToVND(350000) }}
          </div>
          <div class="item col-3 text-right">
            <i
              v-if="data.sizeScreen > 750"
              class="delete pi pi-trash p-error on-click"
            />
            <Button v-else label="Xóa" class="p-button-danger w-full" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="pay card gap-3 p-3 flex align-items-center justify-content-between"
    >
      <div class="btn justify-content-between flex align-items-center gap-3">
        <span class="font-bold">Tổng cộng</span>
        <span class="font-bold p-error">{{ formatToVND(550000) }}</span>
      </div>

      <Button class="btn" label="Thanh toán" />
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 750px) {
  .header {
    display: none !important;
  }

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
  }

  .pay {
    flex-wrap: wrap;
  }

  .pay .btn {
    width: 100% !important;
  }
}
</style>
