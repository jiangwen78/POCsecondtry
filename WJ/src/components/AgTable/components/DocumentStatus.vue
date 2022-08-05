<script setup>
import success from "../icons/ic_arrow_down_green.svg"

const props = defineProps({
  params: Object,
})
</script>

<template>
  <div class="document-status-container">
    <div>
      <div class="document-status-title">Document Status</div>
      <div class="document-status-value">
        <div class="document-status-icon" v-html="success"></div>
        <div
          :class="`document-status-text ${
            props.params.value
              ? 'document-status-text-success'
              : 'document-status-text-error'
          }`"
        >
          {{ props.params.value ? "All verified" : "1 needs attention" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.document-status-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  line-height: 18px;
}

.document-status-title {
  color: #555555;
}
.document-status-value {
  display: flex;
  align-items: center;
}
.document-status-icon {
  margin-right: 6px;
  font-size: 20px;
}
.document-status-text-success {
  color: #009132;
}
.document-status-text-error {
}
</style>
