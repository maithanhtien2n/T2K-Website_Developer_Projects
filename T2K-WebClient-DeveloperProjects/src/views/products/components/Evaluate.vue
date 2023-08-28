<script setup>
import { onMounted, reactive } from "vue";
import { formatDate } from "@/utils";
import { userData } from "@/utils";
import { STORE_PRODUCT, STORE_WAREHOUSE } from "@/services/stores";
import { useRoute } from "vue-router";

const emits = defineEmits(["onEmitUpdateProductDetail"]);

const ROUTE = useRoute();

const { onActionSendEvaluate } = STORE_PRODUCT.StoreProduct();

const { onActionGetWarehouses, onGetterWarehouses: warehouses } =
  STORE_WAREHOUSE.StoreWarehouse();

const props = defineProps(["value"]);

const data = reactive({
  id: ROUTE.params.id,
  amountStart: 0,
  content: null,
});

const onCheckBought = () => {
  return warehouses.value.some(({ product_id }) => +product_id === +data.id);
};

const onClickSendEvaluate = async () => {
  const res = await onActionSendEvaluate({
    user_id: userData.value?.user_info?.user_id,
    product_id: ROUTE.params.id,
    start_amount: data.amountStart,
    content: data.content,
  });

  if (res.success) {
    data.amountStart = 0;
    data.content = null;
    emits("onEmitUpdateProductDetail");
  }
};

onMounted(() => {
  onActionGetWarehouses({ user_id: userData.value?.user_info?.user_id });
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <label class="font-bold text-custom-1">Đánh giá của khách hàng</label>

    <div class="flex gap-3 align-items-center">
      <span class="flex align-items-center gap-1 text-custom-1">
        <i class="pi pi-star-fill text-2xl pb-1 text-main-color" />
        {{
          `${props?.value?.total_evaluate}`.split(".")[1] === "0"
            ? props?.value?.total_evaluate.split(".")[0]
            : props?.value?.total_evaluate
        }}
      </span>
      <span>|</span>
      <span>{{ `Đã có ${props?.value?.amount_evaluate} đánh giá` }}</span>
    </div>

    <div class="flex flex-column gap-3">
      <div
        v-if="userData?.user_info?.full_name"
        class="flex flex-column gap-2 bg-main-right p-3 border-round-lg"
      >
        <Avatar
          :value="{
            image: userData?.user_info?.image,
            name: userData?.user_info?.full_name,
          }"
        >
          <div class="text-custom-mini">{{ formatDate(new Date()) }}</div>

          <div v-if="onCheckBought()">
            <Rating v-model="data.amountStart" :cancel="false">
              <template #onicon>
                <i
                  style="font-size: 0.9rem"
                  class="pi pi-star-fill text-main-color"
                />
              </template>
              <template #officon>
                <i
                  style="font-size: 0.9rem"
                  class="pi pi-star text-main-color"
                />
              </template>
            </Rating>
          </div>
        </Avatar>

        <Textarea
          v-model="data.content"
          autoResize
          rows="3"
          maxlength="1000"
          class="textarea"
          placeholder="Nhập đánh giá"
          :disabled="onCheckBought() && !data.amountStart"
        />

        <Button
          @click="onClickSendEvaluate"
          label="Gửi đánh giá"
          :disabled="!data.content?.trim()"
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
