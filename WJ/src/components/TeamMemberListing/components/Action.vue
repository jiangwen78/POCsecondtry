<script setup>
import { ref, onMounted, nextTick } from "vue"
import tippy from "tippy.js"
import { hideAll } from "tippy.js"
import iconVerticalDots from "../icons/vertical-dots.svg"

const props = defineProps({
  params: Object,
})

const isOpen = ref(false)
const tippyInstance = ref(null)
const trigger = ref()
const content = ref()

const configureTippyInstance = () => {
  tippyInstance.value.enable()
  tippyInstance.value.show()
  tippyInstance.value.setProps({
    trigger: "manual",
    placement: "right",
    allowHTML: true,
    arrow: false,
    interactive: true,
    appendTo: document.body,
    hideOnClick: false,
    onShow: (instance) => {
      hideAll({ exclude: instance })
    },
    onClickOutside: (instance, event) => {
      isOpen.value = false
      instance.unmount()
    },
  })
}

const togglePopup = () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    nextTick(() => {
      configureTippyInstance()
      tippyInstance.value.setContent(content.value)
    })
  } else {
    tippyInstance.value.unmount()
  }
}

onMounted(() => {
  tippyInstance.value = tippy(trigger.value)

  tippyInstance.value.disable()
})
</script>

<template>
  <div class="action-container">
    <div class="action-box">
      <div
        class="action-icon"
        ref="trigger"
        data-action="toggle"
        v-html="iconVerticalDots"
      ></div>
      <div
        class="action-popup"
        v-if="isOpen"
        ref="content"
        @click="togglePopup"
      >
        <div class="action-item">Manage Restaurants</div>
        <div class="action-item">Resend Invite</div>
        <div class="action-item">Cancel Invite</div>
        <div class="action-item">Team Member Details</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
.action-box {
  margin-right: 8px;
}
.action-icon {
  font-size: 20px;
  color: #9e9e9e;
}
.action-popup {
  position: absolute;
  top: 22px;
  right: -8px;
  width: 240px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px #00000064;
  background-color: #fff;
}
.action-popup:after {
  position: absolute;
  right: 16px;
  top: -11px;
  display: block;
  content: "";
  width: 20px;
  height: 20px;
  border-top: 1px solid #707070;
  border-left: 1px solid #707070;
  background-color: #fff;
  transform: rotateZ(45deg);
}
.action-item {
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  border: 1px solid rgba(112, 112, 112, 0.25);
}
</style>
