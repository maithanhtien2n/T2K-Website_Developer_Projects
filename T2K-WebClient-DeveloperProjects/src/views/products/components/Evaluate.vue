<script setup>
import { reactive } from "vue";

const data = reactive({
  evaluate: {
    rating: 0,
    content: "",
  },
});

const comments = [
  {
    rating: 4,
    content: "Sản phẩm quá tốt",
  },
  {
    rating: 4,
    content: "Chất lượng tốt",
  },
  {
    rating: 5,
    content: "Hay nha",
  },
  {
    rating: 5,
    content: "Sẻ ủng hộ lần sau",
  },
  {
    rating: 4,
    content: "Tốt",
  },
];
</script>

<template>
  <div class="flex flex-column gap-3">
    <label class="font-bold text-custom-1">Đánh giá của khách hàng</label>

    <span class="flex align-items-center gap-1 text-custom-1">
      <i style="color: yellow" class="pi pi-star-fill text-2xl pb-1" /> 5
    </span>

    <div class="flex flex-column gap-3">
      <div class="flex flex-column gap-2 bg-main-right p-3 border-round-lg">
        <Avatar>
          <Rating v-model="data.evaluate.rating" :cancel="false">
            <template #onicon>
              <i
                style="font-size: 0.8rem"
                class="pi pi-star-fill text-main-color"
              />
            </template>
            <template #officon>
              <i style="font-size: 0.8rem" class="pi pi-star text-main-color" />
            </template>
          </Rating>
        </Avatar>

        <Textarea
          v-model="data.evaluate.content"
          autoResize
          rows="3"
          maxlength="1000"
          class="textarea"
          placeholder="Nhập đánh giá"
          :disabled="data.evaluate.rating === 0"
        />

        <Button label="Gửi đánh giá" :disabled="data.evaluate.rating === 0" />
      </div>

      <div
        v-for="(item, index) in comments"
        :key="index"
        class="flex flex-column gap-2 bg-main-right p-3 border-round-lg"
      >
        <Avatar>
          <Rating v-model="item.rating" :cancel="false">
            <template #onicon>
              <i
                style="font-size: 0.8rem"
                class="pi pi-star-fill text-main-color"
              />
            </template>
            <template #officon>
              <i style="font-size: 0.8rem" class="pi pi-star text-main-color" />
            </template>
          </Rating>
        </Avatar>

        <div v-html="item.content" />
      </div>
    </div>
  </div>
</template>
