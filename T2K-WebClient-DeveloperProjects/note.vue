<template>
  <Rating v-model="value" :cancel="false">
    <template #onicon>
      <i style="font-size: 0.7rem" class="pi pi-star-fill text-main-color" />
    </template>
    <template #officon>
      <i style="font-size: 0.7rem" class="pi pi-star text-main-color" />
    </template>
  </Rating>
</template>
