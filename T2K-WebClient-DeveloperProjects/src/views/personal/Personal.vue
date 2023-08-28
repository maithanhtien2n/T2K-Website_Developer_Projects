<script setup>
import InfoPersonal from "./components/InfoPersonal.vue";
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
    title: "Nạp tiền",
    content: "Nội dung",
  },
];

onLoadingPage(onActionLoadingActive);
</script>

<template>
  <div class="container body flex flex-column gap-3">
    <div class="card mt-3 flex flex-column gap-3">
      <label class="text-custom-1 font-bold">Hồ sơ của tôi</label>

      <TabView v-model:activeIndex="active">
        <TabPanel v-for="(tab, index) in tabs" :key="index" :header="tab.title">
          <InfoPersonal v-if="index === 0" />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
