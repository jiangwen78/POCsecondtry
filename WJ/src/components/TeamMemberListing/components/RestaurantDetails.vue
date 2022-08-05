<script setup>
const props = defineProps({
  params: Object,
})
</script>

<template>
  <div class="details">
    <div>
      <div class="details-title">Restaurant(s):</div>
      <div class="details-value">
        <strong>1 active</strong>
        <span>/ 1 disabled</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details {
  display: flex;
  align-items: center;
  height: 100%;
}
.details-title {
  font-size: 16px;
  line-height: 18px;
  color: #555555;
}
.details-value {
  font-size: 16px;
  line-height: 18px;
}
.details-value strong {
  color: #009132;
}
.details-value span {
  color: #999;
}
</style>
