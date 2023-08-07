<script setup>
import { reactive } from "vue";
import { formatDate } from "@/utils";
import { StoreApp, STORE_PRODUCT } from "@/services/stores";
import { useRoute } from "vue-router";

const emits = defineEmits(["onEmitUpdateProductDetail"]);

const ROUTE = useRoute();

const { onGetterUserInfo: userInfo } = StoreApp();

const { onActionSendEvaluate } = STORE_PRODUCT.StoreProduct();

const props = defineProps(["value"]);

const data = reactive({
  content: null,
});

const onClickSendEvaluate = async () => {
  const res = await onActionSendEvaluate({
    user_id: userInfo?.user_info?.user_id,
    product_id: ROUTE.params.id,
    start_amount: 0,
    content: data.content,
  });

  if (res.success) {
    data.content = null;
    emits("onEmitUpdateProductDetail");
  }
};
</script>

<template>
  <div class="flex flex-column gap-3">
    <label class="font-bold text-custom-1">Đánh giá của khách hàng</label>

    <div class="flex gap-3 align-items-center">
      <span class="flex align-items-center gap-1 text-custom-1">
        <i class="pi pi-star-fill text-2xl pb-1 text-main-color" />
        {{ props?.value?.total_evaluate }}
      </span>
      <span>|</span>
      <span>{{ `Đã có ${props?.value?.amount_evaluate} đánh giá` }}</span>
    </div>

    <div class="flex flex-column gap-3">
      <div
        v-if="userInfo?.user_info?.image"
        class="flex flex-column gap-2 bg-main-right p-3 border-round-lg"
      >
        <Avatar
          :value="{
            image: userInfo?.user_info?.image,
            name: userInfo?.user_info?.full_name,
          }"
        >
          <div class="text-custom-mini">{{ formatDate(new Date()) }}</div>
        </Avatar>

        <Textarea
          v-model.trim="data.content"
          autoResize
          rows="3"
          maxlength="1000"
          class="textarea"
          placeholder="Nhập đánh giá"
        />

        <Button
          @click="onClickSendEvaluate"
          label="Gửi đánh giá"
          :disabled="!data.content"
        />
      </div>

      <div v-show="!props?.value?.evaluate?.length > 0" class="text-center">
        Chưa có đánh giá nào.
      </div>

      <div
        v-for="(item, index) in props?.value?.evaluate"
        :key="index"
        class="flex flex-column gap-2 bg-main-right p-3 border-round-lg"
      >
        <div class="flex justify-content-between">
          <Avatar
            :value="{
              image: item?.image,
              name: item?.full_name,
            }"
          >
            <div
              v-if="item.start_amount === 'Chưa trải nghiệm sản phẩm'"
              class="text-custom-mini"
            >
              {{ item.start_amount }}
            </div>
            <Rating v-else v-model="item.start_amount" readonly :cancel="false">
              <template #onicon>
                <i
                  style="font-size: 0.8rem"
                  class="pi pi-star-fill text-main-color"
                />
              </template>
              <template #officon>
                <i
                  style="font-size: 0.8rem"
                  class="pi pi-star text-main-color"
                />
              </template>
            </Rating>
          </Avatar>

          <div>{{ formatDate(item?.created_at) }}</div>
        </div>

        <div v-html="item?.content" />
      </div>
    </div>
  </div>
</template>
