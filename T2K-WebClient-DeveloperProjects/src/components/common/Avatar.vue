<script setup>
const props = defineProps({
  value: {
    type: Object,
    required: false,
    default: () => {},
  },
});
</script>

<template>
  <div class="flex gap-2">
    <img class="avatar on-click" :src="props?.value?.image" alt="Lỗi ảnh" />
    <div class="flex flex-column gap-1 on-click">
      <span style="font-size: 0.9rem" class="font-bold">{{
        props?.value?.name
      }}</span>
      <slot />
    </div>
  </div>
</template>
