<script setup>
import { userData } from "@/utils";
import { formatDate } from "@/utils";
import { useRoute } from "vue-router";
import { onMounted, reactive, watch } from "vue";
import { StoreApp, STORE_PRODUCT, STORE_WAREHOUSE } from "@/services/stores";

const emits = defineEmits(["onEmitUpdateProductDetail"]);

const ROUTE = useRoute();

const { onGetterUserInfo: userInfo } = StoreApp();

const { onActionSendEvaluate } = STORE_PRODUCT.StoreProduct();

const { onActionGetWarehouses, onGetterWarehouses: warehouses } =
  STORE_WAREHOUSE.StoreWarehouse();

const props = defineProps(["value"]);

const user_info = userData.value?.user_info;

const data = reactive({
  id: ROUTE.params.id,
  amountStart: 0,
  content: null,

  isCheckEvaluate: false,
});

const onCheckBought = () => {
  return warehouses.value.some(({ product_id }) => +product_id === +data.id);
};

const onCheckEvaluate = () => data.isCheckEvaluate;

const onShowStart = () => onCheckBought() && onCheckEvaluate();

const onClickSendEvaluate = async () => {
  console.log(data.content);

  const res = await onActionSendEvaluate({
    user_id: user_info?.user_id,
    product_id: ROUTE.params.id,
    start_amount: onCheckBought()
      ? onCheckEvaluate()
        ? data.amountStart
        : -1
      : 0,
    content: data.content,
  });

  if (res.success) {
    data.amountStart = 0;
    data.content = null;
    emits("onEmitUpdateProductDetail");
  }
};

watch(
  () => props.value,
  (value) => {
    const userEvaluate = value.evaluate.filter(
      ({ user_id }) => user_id === user_info?.user_id
    );

    data.isCheckEvaluate =
      userEvaluate.length > 0
        ? !userEvaluate.some(({ start_key }) =>
            [1, 2, 3, 4, 5].includes(start_key)
          )
        : true;
  }
);

onMounted(() => {
  onActionGetWarehouses({ user_id: user_info?.user_id });
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
      <span v-if="props?.value?.amount_evaluate">
        {{ `Đã có ${props?.value?.amount_evaluate} đánh giá` }}
      </span>
      <span v-else>Chưa có đánh giá nào</span>
    </div>

    <div class="flex flex-column gap-3">
      <div
        v-if="userInfo?.user_info?.full_name"
        class="flex flex-column gap-2 bg-main-right p-3 border-round-lg"
      >
        <Avatar
          :value="{
            image: userInfo?.user_info?.image,
            name: userInfo?.user_info?.full_name,
          }"
        >
          <div class="text-custom-mini">{{ formatDate(new Date()) }}</div>

          <div v-if="onShowStart()">
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
          :disabled="onShowStart() && !data.amountStart"
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
              v-if="item.start_key === 0 || item.start_key === -1"
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
