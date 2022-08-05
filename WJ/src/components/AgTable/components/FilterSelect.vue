<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue"
import iconUpGreen from "../icons/ic_arrow_up_green.svg"
import iconDownGreen from "../icons/ic_arrow_down_green.svg"
import iconCheckbox from "../icons/checkbox.svg"
import iconCheckboxChecked from "../icons/checkbox-checked.svg"

const props = defineProps({
  placeholder: String,
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  },
})

const emits = defineEmits()

const placeholder = computed(() => {
  if (!props.modelValue.length) {
    return props.placeholder
  }

  return props.modelValue
    .map((value) => {
      const option = props.options.find((item) => item.value === value)

      return option?.label
    })
    .join(",")
})

const opened = ref(false)

const toggleOpenStatus = () => {
  setTimeout(() => {
    opened.value = !opened.value
  }, 0)
}

const close = () => {
  opened.value = false
}

onMounted(() => {
  document.body.addEventListener("click", close)
})

onBeforeUnmount(() => {
  document.body.removeEventListener("click", close)
})

const handleSelectBoxClick = (event) => {
  if (opened.value) {
    event.stopPropagation()
  }
}

const getCheckStatus = (value) => {
  return props.modelValue.includes(value)
}

const toggleCheckStatus = (value) => {
  let nextValue = props.modelValue.slice()

  const i = nextValue.indexOf(value)

  if (i !== -1) {
    nextValue.splice(i, 1)
  } else {
    nextValue.push(value)
  }

  emits("update:model-value", nextValue)
  emits("change", nextValue)
}
</script>

<template>
  <div
    :class="`select-box ${opened ? 'opened' : ''}`"
    @click="handleSelectBoxClick"
  >
    <div class="select-content" @click="toggleOpenStatus">
      <div class="select-placeholder">{{ placeholder }}</div>
      <div class="select-icon" v-show="opened" v-html="iconUpGreen"></div>
      <div class="select-icon" v-show="!opened" v-html="iconDownGreen"></div>
    </div>
    <div class="select-body">
      <div class="select-option-list">
        <div
          class="select-option"
          v-for="item in props.options"
          :key="item.label"
          @click="toggleCheckStatus(item.value)"
        >
          <span class="select-text">{{ item.label }}</span>
          <span
            class="select-check-icon"
            v-show="getCheckStatus(item.value)"
            v-html="iconCheckboxChecked"
          ></span>
          <span
            class="select-check-icon"
            v-show="!getCheckStatus(item.value)"
            v-html="iconCheckbox"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.select-box {
  position: relative;
  width: 248px;
}
.select-content {
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background-color: #fff;
  box-shadow: 0px 1px 2px #00000029;
  border-radius: 5px;
  cursor: pointer;
}
.select-box.opened .select-content {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0px 2px 3px #00000050;
}
.select-placeholder {
  padding: 0 20px;
  font-size: 14px;
  line-height: 42px;
  font-weight: 500;
  color: #555555;
}
.select-icon {
  position: absolute;
  top: 0;
  right: 12px;
  font-size: 16px;
}
.select-body {
  position: absolute;
  left: 0;
  top: 42px;
  z-index: 999;
  display: none;
  width: 100%;
  box-shadow: 0px 2px 3px #00000050;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
}
.select-box.opened .select-body {
  display: block;
}
.select-option-list {
  border-top: 1px solid rgba(112, 112, 112, 0.17);
  padding: 10px 0;
  margin: 0 10px;
}
.select-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  cursor: pointer;
}
.select-option:after {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 0;
  content: "";
  border-bottom: 1px dashed rgba(112, 112, 112, 0.17);
}
.select-text {
  position: relative;
  z-index: 999;
  padding-left: 10px;
  padding-right: 20px;
  font-size: 14px;
  line-height: 18px;
  color: #555555;
  background-color: #fff;
}
.select-check-icon {
  position: relative;
  z-index: 999;
  width: 18px;
  height: 18px;
  font-size: 18px;
  background-color: #fff;
}
</style>
