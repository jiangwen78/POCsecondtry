import { createApp } from "vue"

import app from "./AgTable.vue"

const target = "#restaurant-list"

window.addEventListener("load", () => {
  let el = document.querySelector(target)

  if (!el) {
    el = document.createElement("div")

    el.id = target.substring(0)

    document.body.appendChild(el)
  }

  createApp(app).mount(el)
})
