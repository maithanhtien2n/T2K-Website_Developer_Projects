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
    <img
      class="avatar on-click box-shadow-1 object-fit-cover"
      :src="props?.value?.image || '../../../public/images/avatar.jpg'"
      alt="Lỗi ảnh"
    />
    <div class="flex flex-column gap-1">
      <span style="font-size: 0.9rem" class="font-bold on-click">
        {{ props?.value?.name }}
      </span>
      <slot />
    </div>
  </div>
</template>
