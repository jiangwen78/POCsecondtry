<script setup>
import { computed } from "vue"

const props = defineProps({
  params: Object,
})

const email = computed(() => props.params.data?.email)
</script>

<template>
  <div class="team-member">
    <div>
      <div class="team-member-title">Team Member</div>
      <div class="team-member-value">{{ props.params.value }}</div>
      <div class="team-member-email">{{ email }}</div>
      <div class="details-container">
        <div class="details-title">Restaurant(s):</div>
        <div class="details-value">
          <strong>1 active</strong>
          <span>/ 1 disabled</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-member {
  display: flex;
  align-items: center;
  height: 100%;
}
@media screen and (max-width: 768px) {
  .team-member {
    display: block;
  }
}
.team-member-title {
  font-size: 14px;
  line-height: 20px;
  color: #04a9eb;
}
.team-member-value {
  font-size: 18px;
  line-height: 30px;
  font-weight: 700;
  color: #555555;
}
.team-member-email {
  display: none;
  font-size: 14px;
  line-height: 30px;
  color: #00a8eb;
}
@media screen and (max-width: 988px) {
  .team-member-email {
    display: block;
  }
}
.details-container {
  display: none;
}
@media screen and (max-width: 768px) {
  .details-container {
    display: block;
  }
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
