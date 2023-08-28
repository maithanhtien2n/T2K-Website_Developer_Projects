<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { StoreApp, STORE_PRODUCT } from "@/services/stores";
import { onLoadingPage } from "@/utils";

const { onActionLoadingActive } = StoreApp();

const { onActionGetProducts, onGetterProducts: products } =
  STORE_PRODUCT.StoreProduct();

const ROUTE = useRoute();

const data = reactive({
  keyWord: ROUTE.query.search,
  filter: "",
});

const onChangeTitle = () => {
  return ROUTE.query.search
    ? `Kết quả tìm kiếm cho: " ${data.keyWord} "`
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

onMounted(() => {
  onActionGetProducts({ key_search: data.keyWord });
});

onLoadingPage(onActionLoadingActive);
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
        class="w-full mb-2 mt-3"
      />

      <CardProducts :value="products" />
    </CardBody>

    <div
      v-if="ROUTE.query.search && products?.length > 0"
      class="text-center text-600 line-height-2"
    >
      Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.
    </div>

    <div
      v-if="ROUTE.query.search && products?.length === 0"
      class="text-center text-600 line-height-2"
    >
      Không tìm thấy kết quả nào.
    </div>
  </div>
</template>
