<script setup>
import { reactive } from "vue";

const banners = reactive([
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
</script>

<template>
  <div class="bg-main-left body">
    <div style="padding-top: 0.8rem" class="container">
      <Carousel
        :value="banners"
        :numVisible="1"
        :numScroll="1"
        circular
        :autoplayInterval="3000"
        class="banner"
      >
        <template #item="slotProps">
          <img
            class="image-slide w-full h-15rem object-fit-cover"
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
          />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0;
}

@media only screen and (max-width: 850px) {
  .image-slide {
    height: 10rem !important;
  }
}

@media only screen and (max-width: 500px) {
  .image-slide {
    height: 7rem !important;
  }
}
</style>
