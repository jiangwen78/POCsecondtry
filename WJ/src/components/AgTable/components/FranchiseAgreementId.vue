<script setup>
const props = defineProps({
  params: Object,
})

const status = props.params?.data?.franchiseAgreementStatus
const date = props.params?.data?.dividendYear
const payment = props.params?.data?.dividendPayment
</script>

<template>
  <div>
    <div class="franchise-agreement-id-container">
      <div class="franchise-agreement-id-box">
        <div class="franchise-agreement-id-title">
          FA: {{ props.params.value }}
        </div>
        <div class="franchise-agreement-id-text">
          {{ status }}
        </div>
      </div>
    </div>
    <div class="payment-container">
      <div class="payment-box">
        <div class="payment-title">Dividend Payment Ending {{ date }}</div>
        <div class="payment-text">{{ payment }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.franchise-agreement-id-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
@media screen and (max-width: 768px) {
  .franchise-agreement-id-container {
    justify-content: flex-start;
  }
}
.franchise-agreement-id-box {
  padding: 10px 15px;
  background-color: rgba(29, 145, 50, 0.17);
  border-radius: 3px;
}
@media screen and (max-width: 768px) {
  .franchise-agreement-id-box {
    padding: 8px;
  }
}
.franchise-agreement-id-title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #009132;
}
@media screen and (max-width: 768px) {
  .franchise-agreement-id-title {
    font-size: 12px;
    line-height: 15px;
  }
}
.franchise-agreement-id-text {
  font-size: 12px;
  line-height: 15px;
  color: #555555;
}
@media screen and (max-width: 768px) {
  .franchise-agreement-id-text {
    font-size: 10px;
  }
}
.payment-container {
  display: none;
  margin-top: 7px;
}
@media screen and (max-width: 768px) {
  .payment-container {
    display: block;
  }
}
.payment-title {
  font-size: 10px;
  line-height: 12px;
  color: #555555;
}
.payment-text {
  font-size: 16px;
  line-height: 24px;
  color: #009132;
}
</style>
