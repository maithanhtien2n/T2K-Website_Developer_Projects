<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="w-full flex flex-column gap-2">
    <label class="font-bold">{{ props?.label }}</label>

    <slot />
  </div>
</template>
