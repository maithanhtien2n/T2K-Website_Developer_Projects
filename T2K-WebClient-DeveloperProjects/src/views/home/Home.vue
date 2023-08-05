<script setup>
import Banner from "./components/Banner.vue";
import FeaturedProductsVue from "./components/FeaturedProducts.vue";
import NewProducts from "./components/NewProducts.vue";
import { StoreApp } from "@/services/stores";
import { onLoadingPage } from "@/utils";

const { onActionLoadingActive } = StoreApp();

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="flex flex-column gap-3">
    <!-- Banner -->
    <Banner />
    <div class="container flex flex-column gap-3">
      <!-- Sản phẩm nổi bật -->
      <NewProducts />

      <!-- Sản phẩm nổi bật -->
      <FeaturedProductsVue />
    </div>
  </div>
</template>
