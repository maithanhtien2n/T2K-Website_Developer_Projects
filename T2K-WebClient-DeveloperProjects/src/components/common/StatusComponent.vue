<script setup>
import { computed } from "vue";

const defineStatuses = [
  {
    code: "ACTIVE",
    label: "Hoạt động",
    color: "green",
  },
  {
    code: "LOCK",
    label: "Đã khóa",
    color: "red",
  },
];

const props = defineProps({
  code: {
    type: String,
    required: false,
    default: "ACTIVE",
  },
});

const onRenderColor = (codeColor) => {
  switch (codeColor) {
    case "green":
      return {
        bg: "#E9FAEF",
        cl: "#57C65D",
      };
    case "red":
      return {
        bg: "#FDECEC",
        cl: "#F04444",
      };
    default:
      //
      break;
  }
};

const value = computed(() =>
  defineStatuses.find(({ code }) => code === props?.code)
);
</script>

<template>
  <div class="w-full">
    <span
      :style="{
        backgroundColor: onRenderColor(value?.color).bg,
        color: onRenderColor(value?.color).cl,
      }"
      class="px-2 py-1 border-round-2xl text-center"
    >
      {{ value?.label }}
    </span>
  </div>
</template>
