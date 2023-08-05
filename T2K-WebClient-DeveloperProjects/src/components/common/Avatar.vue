<script setup></script>

<template>
  <div class="flex gap-2">
    <img
      class="avatar on-click"
      src="https://genk.mediacdn.vn/2019/4/2/photo-1-15541780148131777189878.jpg"
      alt=""
    />
    <div class="flex flex-column gap-2 on-click">
      <span style="font-size: 0.9rem" class="font-bold">Tiện Thanh</span>
      <slot />
    </div>
  </div>
</template>
