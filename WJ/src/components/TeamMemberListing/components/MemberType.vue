<script setup>
import { computed } from "vue"
import restaurant from "../icons/restaurant.svg"

const props = defineProps({
  params: Object,
})
</script>

<template>
  <div class="member-type-container">
    <div>
      <div class="member-type-icon" v-html="restaurant"></div>
    </div>
  </div>
</template>

<style scoped>
.member-type-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.member-type-icon {
  font-size: 50px;
  text-align: center;
  color: #009132;
}
.member-type-text {
  padding: 4px 10px;
  border: 1px solid #009132;
  font-size: 14px;
  font-weight: 500;
  color: #009132;
  border-radius: 3px;
}
</style>
