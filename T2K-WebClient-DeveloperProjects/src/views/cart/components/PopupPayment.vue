<script setup>
import { reactive } from "vue";
import { formatToVND } from "@/utils/index";

const data = reactive({
  display: true,
});
</script>

<template>
  <Dialog v-model:visible="data.display" modal class="w-30rem">
    <template #header>
      <span class="font-bold text-2xl">Xác nhận thanh toán</span>
    </template>

    <div class="w-full flex flex-column gap-3">
      <div>
        <span class="font-bold">Sản phẩm: </span>
        <span class="line-height-2"
          >mẫu login, trọn bộ khóa học php, template cart</span
        >
      </div>

      <div class="flex justify-content-between">
        <span class="font-bold">Số lượng sản phẩm:</span>
        <span>2</span>
      </div>
      <div class="flex justify-content-between">
        <span class="font-bold">Tổng số tiền:</span>
        <span class="p-error">{{ formatToVND(50000000) }}</span>
      </div>

      <div class="bg-black-alpha-10 p-2 line-height-2">
        Sau khi bạn ấn xác nhận chúng tôi sẽ gửi sản phẩm vào kho của bạn, hãy
        kiểm tra kho nhé!
      </div>
    </div>

    <template #footer>
      <Button label="Bỏ qua" class="p-button-outlined" />
      <Button label="Xác nhận" />
    </template>
  </Dialog>
</template>
