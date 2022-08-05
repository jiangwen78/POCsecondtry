<script setup>
import { computed } from "vue"
import restaurant from "../icons/restaurant.svg"

const props = defineProps({
  params: Object,
})

const value = computed(() => (props.params.value ? "open" : "close"))
</script>

<template>
  <div class="settle-container">
    <div>
      <div class="settle-icon" v-html="restaurant"></div>
      <div class="settle-text">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
.settle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.settle-icon {
  font-size: 50px;
  text-align: center;
  color: #009132;
}
.settle-text {
  padding: 4px 10px;
  border: 1px solid #009132;
  font-size: 14px;
  font-weight: 500;
  color: #009132;
  border-radius: 3px;
}
</style>
