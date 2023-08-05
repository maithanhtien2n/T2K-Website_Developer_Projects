<script setup>
import { onLoadingPage } from "@/utils";
import { StoreApp } from "@/services/stores";
import ProductsCart from "./components/ProductsCart.vue";
import PopupPayment from "./components/PopupPayment.vue";

const { onActionLoadingActive } = StoreApp();

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body">
    <div class="mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Giỏ hàng</label>

      <ProductsCart />
    </div>
  </div>

  <PopupPayment />
</template>
