<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const ROUTER = useRouter();

const { onActionLoadingActive } = StoreApp();

const onClickViewAllProducts = () => {
  onActionLoadingActive(true);
  ROUTER.push({ name: "Products" });
};

const products = reactive([
  {
    image:
      "https://static.wikia.nocookie.net/bach-khoa-the-gioi-toan-thu/images/e/e4/Son_goku.png",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
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
  {
    image:
      "https://genk.mediacdn.vn/2019/4/2/photo-1-15541780148131777189878.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image: "https://genk.mediacdn.vn/2017/photo-5-1510731177550.jpg",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
  {
    image:
      "https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-7-vien-ngoc-rong-3d-songoku-toc-do.png",
    title: "Project php bán hàng bằng PHP",
    price: 500000,
    sold: 200,
  },
]);
</script>

<template>
  <CardBody label="Sản phẩm mới nhất">
    <CardProducts :value="products" />

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
