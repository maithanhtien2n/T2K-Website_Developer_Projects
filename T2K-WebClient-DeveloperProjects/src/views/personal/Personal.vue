<script setup>
import InfoPersonal from "./components/InfoPersonal.vue";
import Warehouse from "./components/Warehouse.vue";
import ToUp from "./components/ToUp.vue";
import { onLoadingPage, userData } from "@/utils";
import { StoreApp } from "@/services/stores";
import { ref } from "vue";

const { onActionLoadingActive } = StoreApp();

const active = ref();

const tabs = [
  {
    title: "Hồ sơ",
    content: "Thông tin hồ sơ",
  },
  {
    title: "Kho hàng",
    content: "Nội dung",
  },
  {
    title: "Ví ngân lượng",
    content: "Nội dung",
  },
];

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body flex flex-column gap-3">
    <div class="card mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Tài khoản của tôi</label>

      <TabView v-model:activeIndex="active">
        <TabPanel v-for="(tab, index) in tabs" :key="index" :header="tab.title">
          <InfoPersonal v-if="index === 0" />
          <Warehouse v-if="index === 1" />
          <ToUp v-if="index === 2" />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
