import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { API_PRODUCT } from "@/services/api";
import { Utils } from "@/utils/response";

export const StoreProduct = defineStore("StoreProduct", () => {
  const { onResponse } = Utils();

  const API = API_PRODUCT.API_PRODUCT;

  // State
  const products = ref([]);
  const productDetail = ref({});

  // Getter
  const onGetterProducts = computed(() => products);
  const onGetterProductDetail = computed(() => productDetail);

  // Action
  const onActionGetProducts = async (args) => {
    const result = await onResponse(API.onApiGetProducts(args));
    return (products.value = result.data);
  };

  const onActionGetProductDetail = async (params) => {
    const result = await onResponse(API.onApiGetProductDetail(params));
    return (productDetail.value = result.data);
  };

  const onActionSendEvaluate = async (args) => {
    return await onResponse(API.onApiSendEvaluate(args), true);
  };

  return {
    // Getter
    onGetterProducts,
    onGetterProductDetail,
    // Action
    onActionGetProducts,
    onActionGetProductDetail,
    onActionSendEvaluate,
  };
});
