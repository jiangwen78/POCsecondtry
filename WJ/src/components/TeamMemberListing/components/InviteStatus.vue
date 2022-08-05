<script setup>
const props = defineProps({
  params: Object,
})
</script>

<template>
  <div class="invite-status-container">
    <div v-if="props.params.value">
      <div class="invite-status-title">Invite Status:</div>
      <div class="invite-status-value">{{ props.params.value }}</div>
    </div>
  </div>
</template>

<style scoped>
.invite-status-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.invite-status-title {
  font-size: 16px;
  line-height: 28px;
  color: #555555;
}
.invite-status-value {
  padding: 5px 16px;
  font-size: 16px;
  line-height: 20px;
  color: #555555;
  border-radius: 3px;
  background-color: #c69905;
}
</style>
