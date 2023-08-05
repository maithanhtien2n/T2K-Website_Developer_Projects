<script setup>
import { formatToVND } from "@/utils";
import { reactive, onMounted } from "vue";
import { StoreApp } from "@/services/stores";
import { onLoadingPage } from "@/utils";
import Evaluate from "./components/Evaluate.vue";

const { onActionLoadingActive } = StoreApp();

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
            class="w-full h-full object-fit-cover"
            src="https://imagenes.20minutos.es/files/image_654_369/uploads/imagenes/2017/05/09/442004.jpg"
            alt=""
          />
        </div>

        <!-- Right -->
        <div class="col-right col-7 p-3 flex flex-column gap-3">
          <span class="title font-bold text-2xl text-main-color">
            Làm thế nào để học HTML và CSS từ đầu một cách nhanh chóng?
          </span>

          <div class="flex gap-3 text-700">
            <span class="flex align-items-center gap-1">
              <i style="color: yellow" class="pi pi-star-fill" /> 5
            </span>
            <span>|</span>
            <span>55 đánh giá</span>
            <span>|</span>
            <span>6,8 đã bán</span>
          </div>

          <div class="flex gap-3 bg-black-alpha-10 p-3">
            <span class="line-through text-800">
              {{ formatToVND(500000) }}
            </span>

            <div class="flex flex-column gap-2">
              <div class="flex align-items-center gap-3">
                <span class="text-2xl font-bold p-error">
                  {{ formatToVND(350000) }}
                </span>
                <span
                  style="padding-top: 0.3rem !important"
                  class="bg-main-color p-1 px-2 text-white text-custom-mini border-round-2xl"
                >
                  Giảm 20%
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
            <Button class="btn-item" label="Thêm vào giỏ hàng" />
            <Button class="btn-item p-button-danger" label="Thanh toán ngay" />
          </div>
        </div>
      </div>

      <div class="border-top-1 text-300 pt-3 mt-2 flex flex-column gap-1">
        <span class="font-bold text-800">Mô tả sản phẩm</span>

        <div class="line-height-3 text-800">
          1. CÔNG DỤNG Kìm Bóp Tập Cơ Tay ✦ Tăng sức mạnh cho tay sẽ giúp bạn
          giữ tạ trong thời gian lâu hơn khi tham gia tập thể hình; tăng sức
          mạnh vung vợt lên đáng kể khi chơi cầu lông, Tennis; giúp ích khi tập
          luyện thể dục dụng cụ hoặc tập leo núi,... ✦ Tăng độ bền cho đôi tay:
          từ đó tăng khả năng cầm nắm cho đôi tay của bạn. Chẳng hạn, bạn sẽ
          xách được vali hay túi nặng với trọng lượng lớn hơn và đi được quãng
          đường dài hơn so với lúc chưa tập. Bạn sẽ tăng được sức chịu đựng của
          đôi tay và sẽ không dễ dàng bị khuất phục trước sự mệt mỏi để mang
          chúng đi khắp nơi ✦ Tăng cơ bắp cho cẳng tay: Theo nhiều huấn luyện
          viên thể hình, nếu muốn cổ tay ấn tượng hơn và to hơn người khác thì
          bạn nên tập luyện với kìm bóp tay thường xuyên. ✦ Kìm bóp tay sẽ hoạt
          động để rèn luyện cho các ngón tay của bạn một cách độc lập, từ đó cải
          thiện được sự khéo léo cho đôi tay ✦ Giúp tuần hoàn máu, giúp giảm
          stress hiệu quả và đồng thời giúp tăng cường sức khỏe
        </div>
      </div>
    </div>

    <!-- Sản phẩm liên quan -->
    <CardBody label="Sản phẩm liên quan">
      <CardProducts :value="products" />
    </CardBody>

    <!-- Đánh giá của người dùng -->
    <Evaluate />
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
