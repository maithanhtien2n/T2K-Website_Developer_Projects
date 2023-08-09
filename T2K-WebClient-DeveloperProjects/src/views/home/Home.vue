<script setup>
import Banner from "./components/Banner.vue";
import FeaturedProductsVue from "./components/FeaturedProducts.vue";
import NewProducts from "./components/NewProducts.vue";
import { StoreApp, STORE_PRODUCT } from "@/services/stores";
import { onLoadingPage } from "@/utils";
import { onMounted } from "vue";

const { onActionLoadingActive } = StoreApp();

const { onActionGetProducts, onGetterProducts: products } =
  STORE_PRODUCT.StoreProduct();

onMounted(() => {
  onActionGetProducts();
});

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="flex flex-column gap-3">
    <!-- Banner -->
    <Banner />

    <div class="container flex flex-column gap-3">
      <!-- Sản phẩm mới nhất -->
      <NewProducts :products="products" />

      <!-- Sản phẩm nổi bật -->
      <FeaturedProductsVue />
    </div>
  </div>
</template>
