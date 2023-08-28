<script setup>
import { reactive } from "vue";

const banners = reactive([
  {
    image: "https://wallpaperaccess.com/full/751974.jpg",
  },
  {
    image: "https://wallpaperaccess.com/full/3833829.png",
  },
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/729/985/143/anime-rwby-ruby-rose-character-wallpaper-preview.jpg",
  },
  {
    image:
      "https://i.pinimg.com/originals/a4/1a/c7/a41ac762418248406597fa217f217aa4.jpg",
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
