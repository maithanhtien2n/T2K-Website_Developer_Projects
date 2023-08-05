<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const ROUTER = useRouter();

const { onActionLoadingActive } = StoreApp();

const props = defineProps(["displaySearch"]);

const emits = defineEmits(["onClosePopup"]);

const data = reactive({
  search: {
    keySearch: "",
  },
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
};

const onClickSearchProducts = () => {
  onActionLoadingActive(true);
  ROUTER.push({ name: "Products", query: { search: data.search.keySearch } });
  data.search.keySearch = "";
  setTimeout(() => onActionLoadingActive(false), 1000);
  if (data.sizeScreen < 1165) onClickClosePopup();
};

watch(
  () => props.displaySearch,
  (value) => {
    data.display.transform = value;
  }
);

watch(
  () => data.display.transform,
  (value) => {
    if (value === "translateX(-100%)") emits("onClosePopup");
  }
);
</script>

<template>
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
        v-model="data.search.keySearch"
        type="text"
        class="w-full border-none outline-none text-700 bg-transparent"
        placeholder="Bạn cần tìm?"
        @keypress.enter="onClickSearchProducts"
      />
      <i
        @click="onClickSearchProducts"
        class="pi pi-search on-click font-bold text-800"
        :class="{ 'p-disabled': !data.search.keySearch }"
      />

      <div
        v-if="false"
        style="top: 120%"
        :class="{ card: data.sizeScreen > 1165 }"
        class="left-0 right-0 absolute py-2 flex flex-column p-0 overflow-hidden"
      >
        <span class="p-3 item-result on-click">gdggdsgs</span>
        <span class="p-3 item-result on-click">gdggdsgs</span>
        <span class="p-3 item-result on-click">gdggdsgs</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-category-icon {
  display: none;
}

.card {
  background: #dadada;
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
}
</style>
