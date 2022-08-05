import { cells, evalCell } from './store.js'

export default {
  props: {
    c: Number,
    r: Number
  },
  data() {
    return {
      editing: false,
      cells
    }
  },
  methods: {
    evalCell,
    update(e) {
      this.editing = false
      cells[this.c][this.r] = e.target.value.trim()
    }
  },
  template: `
  <div class="cell" :title="cells[c][r]" @click="editing = true">
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vnode-mounted="({ el }) => el.focus()"
    >
    <span v-else>{{ evalCell(cells[c][r]) }}</span>
  </div>
  `
}
