<script setup>
import { computed } from "vue"

const props = defineProps({
  params: Object,
})

const settleStatus = computed(() =>
  props.params?.data?.okToSettle ? "open" : "close"
)
const address = computed(() => {
  const { line1, line2, city, state, postcode, country } =
    props.params?.data?.address ?? {}

  return `${line1 ?? ""} ${line2 ?? ""} ${city ?? ""} ${state ?? ""} ${
    postcode ?? ""
  } ${country ?? ""}`
})
</script>

<template>
  <div class="restaurant-number">
    <div>
      <div class="restaurant-number-title">Restaurant</div>
      <div class="restaurant-number-value">
        <span>{{ props.params.value }}</span>
        <span class="restaurant-settle-status">{{ settleStatus }}</span>
      </div>
      <div class="restaurant-number-address">{{ address }}</div>
    </div>
  </div>
</template>

<style scoped>
.restaurant-number {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.restaurant-number-title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #04a9eb;
}
.restaurant-number-value {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 30px;
  color: #555555;
}
.restaurant-settle-status {
  display: none;
  padding: 3px 8px;
  border: 1px solid #009132;
  margin-left: 16px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
  color: #009132;
  border-radius: 3px;
}
@media screen and (max-width: 988px) {
  .restaurant-settle-status {
    display: block;
  }
}
.restaurant-number-address {
  font-size: 12px;
  line-height: 14px;
  white-space: normal;
}
</style>
