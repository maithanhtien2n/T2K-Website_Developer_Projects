<script setup>
import { formatToVND } from "@/utils";
import { reactive } from "vue";

const data = reactive({
  tutorial: `<p><span style="color: rgb(52, 53, 65);">- Bước 1: Mở ứng dụng ngân hàng của bạn</span></p><p><span style="color: rgb(52, 53, 65);">- Bước 2: Chuyển khoản hoặc quét mã QR</span></p><p><span style="color: rgb(52, 53, 65);">- Bước 3: Nội dung chuyển khoản: [tên tài khoản của bạn], [số điện thoại của bạn].</span></p>`,
  note: `<p><span style="color: rgb(52, 53, 65);">- Đảm bảo rằng bạn đã nhập thông tin (số tài khoản hoặc quét mã QR) đúng và chính xác để tránh lỗi giao dịch.</span></p><p><span style="color: rgb(52, 53, 65);">- Sau khi hoàn tất thanh toán, chúng tôi sẽ cộng số tiền vào tài khoản của bạn nhanh nhất có thể.</span></p><p><span style="color: rgb(52, 53, 65);">- Nếu bạn gặp bất kỳ vấn đề hoặc cần hỗ trợ, liên hệ với chúng tôi tại đây.</span></p>`,
  value: "",

  infoTransfer: `<p><span style="color: rgb(52, 53, 65);">- Bước 1: Mở ứng dụng ngân hàng của bạn</span></p><p><span style="color: rgb(52, 53, 65);">- Bước 2: Chuyển khoản hoặc quét mã QR</span></p><p><span style="color: rgb(52, 53, 65);">- Bước 3: Nội dung chuyển khoản: [tên tài khoản của bạn], [số điện thoại của bạn].</span></p>`,
  isPayments: "",
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <div class="flex gap-2 bg-black-alpha-10 p-3">
      <span class="font-bold">Số dư :</span>
      <span class="font-bold">{{ formatToVND(2000000) }}</span>
    </div>

    <div class="container-to-up flex">
      <!-- Cột trái -->
      <div
        style="border-right: 1px solid #ddd"
        class="col-left col-6 pr-3 p-0 flex flex-column gap-3"
      >
        <div class="flex flex-column gap-2">
          <span class="font-bold">Hướng dẫn thanh toán</span>
          <div v-html="data.tutorial" class="line-height-3" />
        </div>

        <div class="flex flex-column gap-2">
          <span class="font-bold p-error">Lưu ý</span>
          <div v-html="data.note" class="line-height-3" />
        </div>
      </div>

      <!-- Cột phải -->
      <div class="col-right col-6 pl-3 p-0 flex flex-column gap-3">
        <span class="font-bold">Thông tin thanh toán</span>
        <SelectButton
          v-model="data.isPayments"
          :options="['Chuyển khoản', 'QR']"
          aria-labelledby="basic"
          :clearable="false"
          :resetAfter="0"
        />

        <div>
          <div
            v-show="data.isPayments === 'Chuyển khoản'"
            v-html="data.infoTransfer"
            class="line-height-3"
          />
          <img
            v-show="data.isPayments === 'QR'"
            class="w-13rem h-13rem box-shadow-1 p-3"
            src="https://thuthuatmaytinh.vn/wp-content/uploads/2019/10/ma-qr-thuthuatmaytinh-vn.png"
            alt="Lỗi ảnh"
          />
          <div v-show="!data.isPayments" class="text-center py-6">
            Bạn chưa chọn hình thức nào.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .col-left {
    width: 100% !important;
    padding: 0 !important;
    border: none !important;
  }

  .col-right {
    width: 100% !important;
    padding: 0 !important;
  }

  .container-to-up {
    flex-wrap: wrap !important;
    gap: 1rem !important;
  }
}
</style>
