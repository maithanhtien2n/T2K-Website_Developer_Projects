<script setup>
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onLoadingPageRepeat, formatToVND } from "@/utils";
import { StoreApp, STORE_PRODUCT, STORE_HOME } from "@/services/stores";

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const { onActionGetProducts, onActionGetProductDetail } =
  STORE_PRODUCT.StoreProduct();

const { onActionGetProducts: onGetProducts, onGetterProducts: products } =
  STORE_HOME.StoreHome();

const props = defineProps(["displaySearch", "resetKeySearch"]);

const emits = defineEmits(["onClosePopup"]);

const data = reactive({
  keySearch: "",
  suggestionBoard: false,
  display: {
    transform: window.innerWidth > 1165 ? "translateX(0)" : "translateX(-100%)",
  },
  sizeScreen: window.innerWidth,
});

window.addEventListener("resize", () => {
  data.display.transform =
    window.innerWidth > 1165 || data.display.transform === "translateX(0)"
      ? "translateX(0)"
      : "translateX(-100%)";
  data.sizeScreen = window.innerWidth;
});

const onClickClosePopup = () => {
  data.display.transform = "translateX(-100%)";
  data.keySearch = "";
};

const onClickCloseSuggestionBoard = () => {
  data.suggestionBoard = false;
};

const onInputSearch = (key_search) => {
  onGetProducts({ key_search });
};

const onClickSearchProducts = async () => {
  await onActionGetProducts({ key_search: data.keySearch });
  onLoadingPageRepeat(
    ROUTE.name === "Products",
    onActionLoadingActive,
    ROUTER.push({ name: "Products", query: { search: data.keySearch } })
  );
  data.suggestionBoard = false;
  if (data.sizeScreen < 1165) onClickClosePopup();
};

const onClickItemSearch = async (id) => {
  await onActionGetProductDetail(id);
  onLoadingPageRepeat(
    ROUTE.name === "ProductDetail",
    onActionLoadingActive,
    ROUTER.push({
      name: "ProductDetail",
      params: { id },
    })
  );
  data.suggestionBoard = false;
  if (data.sizeScreen < 1165) onClickClosePopup();
};

watch(
  () => props.displaySearch,
  (value) => {
    data.display.transform = value;
  }
);

watch(
  () => props.resetKeySearch,
  () => {
    data.keySearch = "";
  }
);

watch(
  () => data.display.transform,
  (value) => {
    if (value === "translateX(-100%)") emits("onClosePopup");
  }
);

watch(
  () => data.keySearch,
  (value) => {
    if (value) data.suggestionBoard = true;
    else data.suggestionBoard = false;
  }
);
</script>

<template>
  <BackgroundRemovePopup
    :display="data.suggestionBoard"
    @onRemovePopup="onClickCloseSuggestionBoard"
    class="opacity-0"
  />

  <div :style="data.display" class="bg-search">
    <i
      @click="onClickClosePopup"
      style="top: 1rem; left: 1rem"
      class="active-category-icon pi pi-arrow-left absolute font-bold text-2xl on-click text-200"
    />

    <div
      style="padding: 0.8rem"
      class="search relative w-23rem flex align-items-center gap-2 bg-white border-round-3xl"
    >
      <input
        v-model.trim="data.keySearch"
        type="text"
        class="w-full border-none outline-none text-700 bg-transparent"
        placeholder="Bạn cần tìm?"
        @keypress.enter="onClickSearchProducts"
        @input="onInputSearch(data.keySearch)"
        @click="
          () =>
            data.keySearch
              ? (data.suggestionBoard = true)
              : (data.suggestionBoard = false)
        "
      />
      <i
        @click="onClickSearchProducts"
        class="pi pi-search on-click font-bold text-800"
        :class="{ 'p-disabled': !data.keySearch }"
      />

      <div
        v-if="data.suggestionBoard"
        style="top: 120%"
        :class="{ card: data.sizeScreen > 1165 }"
        class="left-0 right-0 absolute py-2 flex flex-column p-0 overflow-hidden"
      >
        <div
          v-for="(item, index) in products.slice(0, 4)"
          :key="index"
          class="px-3 py-2 line-height-2 item-result on-click fixed-text"
          style="border-bottom: 1px solid #f0f0f0"
          @click="onClickItemSearch(item?.product_id)"
        >
          <div class="flex align-items-center gap-2">
            <img
              :src="item?.image"
              class="w-3rem h-3rem object-fit-cover border-circle"
              alt="Lỗi ảnh"
            />
            <div class="flex flex-column">
              <span> {{ item?.name }}</span>
              <div class="flex gap-2 align-items-end">
                <span
                  v-if="item?.price_sale"
                  class="text-custom-mini text-700 line-through"
                >
                  {{ formatToVND(item?.price) }}
                </span>
                <span class="p-error">
                  {{
                    formatToVND(
                      item?.price_sale ? item?.price_sale : item?.price
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <span
          v-if="products?.length === 0"
          class="footer w-full p-3 on-click text-main-color"
        >
          Không tìm thấy kết quả nào
        </span>
        <span
          v-else
          class="footer w-full p-3 on-click text-main-color"
          @click="onClickSearchProducts"
        >
          Tìm với từ khóa {{ `" ${data.keySearch} "` }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-category-icon {
  display: none;
}

.card {
  background: #ffffff;
}

.item-result {
  transition: all 0.1s ease;
}

.item-result:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 1165px) {
  .active-category-icon {
    display: block !important;
  }

  .bg-search {
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 3rem 1rem;
    transition: all 0.3s ease;
    background-image: linear-gradient(to top, #dadada, var(--mainColor));
  }

  .search {
    width: 100% !important;
    background-color: aliceblue;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    margin-top: 0.5rem;
  }

  .footer {
    color: #ffffff !important;
  }
}
</style>
