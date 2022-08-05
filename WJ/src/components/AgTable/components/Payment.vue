<script setup>
const props = defineProps({
  params: Object,
})

const date = props.params?.data?.dividendYear
</script>

<template>
  <div class="payment-container">
    <div class="payment-box">
      <div class="payment-title">Dividend Payment Ending {{ date }}</div>
      <div class="payment-text">
        {{ props.params.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.payment-title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #555555;
}
.payment-text {
  font-size: 24px;
  line-height: 34px;
  color: #009132;
}
</style>
