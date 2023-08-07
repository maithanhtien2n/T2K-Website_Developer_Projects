<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const props = defineProps(["products"]);

const ROUTER = useRouter();

const { onActionLoadingActive } = StoreApp();

const onClickViewAllProducts = () => {
  onActionLoadingActive(true);
  ROUTER.push({ name: "Products" });
};
</script>

<template>
  <CardBody label="Sản phẩm mới nhất">
    <CardProducts :value="props?.products.slice(0, 8)" />

    <div class="w-full flex justify-content-center">
      <span
        @click="onClickViewAllProducts"
        class="text-center p-2 border-1 text-700 on-click-2"
      >
        Xem tất cả sản phẩm
      </span>
    </div>
  </CardBody>
</template>
