<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { StoreApp } from "@/services/stores";
import { onLoadingPage } from "@/utils";

const { onActionLoadingActive } = StoreApp();

const ROUTE = useRoute();

const data = reactive({
  keyWord: ROUTE.query.search,
  filter: "",
});

const onChangeTitle = () => {
  return ROUTE.query.search
    ? `Kết quả tìm kiếm cho: '${data.keyWord}'`
    : "Tất cả sản phẩm";
};

watch(
  () => ROUTE.query.search,
  (value) => {
    data.keyWord = value;
  }
);

const filterOptions = reactive([
  {
    name: "Mới nhất",
    code: "MOI_NHAT",
  },
  {
    name: "Bán chạy nhất",
    code: "BAN_CHAY_NHAT",
  },
  {
    name: "Giảm giá",
    code: "GIAM_GIA",
  },
  {
    name: "Gói vip",
    code: "GOI_VIP",
  },
]);

onLoadingPage(onActionLoadingActive);

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
  <div class="container body">
    <CardBody class="mt-3" :label="onChangeTitle()">
      <Dropdown
        v-model="data.filter"
        :options="filterOptions"
        optionLabel="name"
        optionValue="code"
        placeholder="Bộ lọc sản phẩm"
        class="w-full mb-2"
      />

      <CardProducts :value="products" />
    </CardBody>

    <div v-if="ROUTE.query.search" class="text-center text-600 line-height-2">
      Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.
    </div>
  </div>
</template>
