<script setup>
import { reactive } from "vue";

const featuredProducts = reactive([
  {
    image:
      "https://vtcc.vn/wp-content/uploads/2023/04/Corporate-and-Digital-Business-Marketing-Promotion-Horizontal-Web-Banner-Design-PSD-scaled.jpg",
  },
  {
    image:
      "https://d3pyarv4eotqu4.cloudfront.net/wdcprinto/images/product/Banner_Printing37.png",
  },
  {
    image:
      "https://haycafe.vn/wp-content/uploads/2022/03/Background-banner-1.jpg",
  },
  {
    image:
      "https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png",
  },
]);

const responsiveOptions = reactive([
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "991px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <CardBody label="Sản phẩm nổi bật">
    <Carousel
      :value="featuredProducts"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
      style="padding-top: 1.6rem"
      class="box-shadow"
    >
      <template #item="slotProps">
        <div class="mx-2 item-card">
          <div
            style="background-color: rgb(224, 224, 224)"
            class="w-full box-shadow flex flex-column"
          >
            <div class="image w-full h-15rem overflow-hidden">
              <img
                :src="slotProps.data.image"
                class="w-full h-full object-fit-cover"
              />
            </div>

            <div class="p-2 flex flex-column gap-1">
              <span class="on-click-1">Tên sản phẩm mô tả như thế nào</span>
              <span class="p-error">Giá: 500.000đ</span>
              <span
                class="text-800 w-full text-custom-mini line-height-2 clamp-1"
                >Mô tả về sản phẩm đổi nét để cho người dùng có thể hình...
              </span>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </CardBody>
</template>

<style scoped>
@media only screen and (max-width: 767px) {
  .item-card {
    margin: 0 !important;
  }
}

@media only screen and (max-width: 650px) {
  .image {
    height: 10rem !important;
  }
}
</style>
