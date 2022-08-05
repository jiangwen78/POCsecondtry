<script>
import { AgGridVue } from "ag-grid-vue3"
import axios from "axios"
import MemberType from "./components/MemberType.vue"
import TeamMemberName from "./components/TeamMemberName.vue"
import RestaurantDetails from "./components/RestaurantDetails.vue"
import InviteStatus from "./components/InviteStatus.vue"
import Action from "./components/Action.vue"
import FilterSelect from "./components/FilterSelect.vue"
import iconRestaurant from "./icons/restaurant.svg"
import iconSearch from "./icons/search.svg"
import iconUpGreen from "./icons/ic_arrow_up_green.svg"
import iconDownGreen from "./icons/ic_arrow_down_green.svg"
import iconCheckbox from "./icons/checkbox.svg"
import iconCheckboxChecked from "./icons/checkbox-checked.svg"
import iconFilter from "./icons/icon-filter.svg"

import "ag-grid-community/styles/ag-grid.css"

// {
//     "searchText": "",
//     "restaurant": [], // will be the long integer value for the chosen status(es)
//     "enabled": [], // will be the long integer value for the chosen status(es)
//     "roles": [], // will be the long integer value for the chosen status(es)
//     "pagenumber": 0 // page number
//     "pagesize": 10
// }

const loadData = async (payload) => {
  const url = "/mock-api-data/team-members.json"

  console.log("==> query data with", payload)

  const { data } = await axios.post(url, payload)

  return data
}

const loadConfig = async () => {
  const { data } = await axios.get("/data.json")

  return data
}

const columnDefConfig = [
  {
    field: "memberType",
    cellRenderer: "MemberType",
  },
  {
    field: "teamMemberName",
    cellRenderer: "TeamMemberName",
  },
  {
    field: "restaurantDetails",
    cellRenderer: "RestaurantDetails",
    minWidth: 300,
  },
  {
    field: "inviteStatus",
    cellRenderer: "InviteStatus",
    minWidth: 300,
  },
  {
    field: "email",
    cellClass: "person-email-address",
    minWidth: 150,
  },
  {
    field: "action",
    cellRenderer: "Action",
    getRowId() {
      return "action"
    },
  },
]

const columnFields = {
  lg: [
    "memberType",
    "teamMemberName",
    "restaurantDetails",
    "inviteStatus",
    "email",
    "action",
  ],
  md: [
    "memberType",
    "teamMemberName",
    "restaurantDetails",
    "inviteStatus",
    "action",
  ],
  sm: ["teamMemberName", "inviteStatus", "action"],
}

const restaurantOptions = [
  {
    label: "Restaurants001",
    value: 1,
  },
  {
    label: "Restaurants002",
    value: 2,
  },
]
const enabledOptions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
]
const rolesOptions = [
  {
    label: "Role 1",
    value: "role 1",
  },
  {
    label: "Role 2",
    value: "role 2",
  },
]
const permissionOptions = [
  {
    label: "Permission 1",
    value: "permission 1",
  },
  {
    label: "Permission 2",
    value: "permission 2",
  },
  {
    label: "Permission 3",
    value: "permisson 3",
  },
]

const inviteStatusOptions = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "null",
    value: "null",
  },
]

export default {
  components: {
    AgGridVue,
    MemberType,
    TeamMemberName,
    RestaurantDetails,
    InviteStatus,
    Action,
    FilterSelect,
  },
  data() {
    return {
      iconRestaurant,
      iconSearch,
      iconUpGreen,
      iconDownGreen,
      iconCheckbox,
      iconCheckboxChecked,
      iconFilter,
      gridApi: null,
      gridColumnApi: null,
      columnDefs: [],
      config: {
        "restaurantlisting.search.buttonlabel": "",
        "restaurantlisting.filter.label": "",
      },
      searchText: "",
      filter: {
        restaurant: [],
        enabled: [],
        roles: [],
        permissions: [],
        inviteStatus: [],
      },
      restaurantOptions,
      enabledOptions,
      rolesOptions,
      permissionOptions,
      inviteStatusOptions,
      filterPopupVisible: false,
      activeFilterPopupItem: "",
      filterConfig: [
        {
          key: "restaurant",
          title: "Restaurant",
          options: restaurantOptions,
        },
        {
          key: "enabled",
          title: "Enabled",
          options: enabledOptions,
        },
        {
          key: "roles",
          title: "Document Status",
          options: rolesOptions,
        },
      ],
      screen: "lg",
    }
  },
  async created() {
    const config = await loadConfig()

    console.log("=> loaded config", config)

    this.config = config
  },
  mounted() {
    window.addEventListener("resize", this.setColumns)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setColumns)
  },
  methods: {
    setColumns() {
      const size = document.documentElement.clientWidth
      let screen = "lg"

      if (size <= 768) {
        screen = "sm"
      } else if (size <= 988) {
        screen = "md"
      }

      this.screen = screen
      const fields = columnFields[screen]

      const columnDefs = columnDefConfig.filter((item) =>
        fields.includes(item.field)
      )

      this.gridApi?.setColumnDefs(columnDefs)
    },
    setDatasource() {
      const { searchText, filter } = this

      const getRows = async ({ startRow, endRow, successCallback }) => {
        const pagesize = endRow - startRow

        const payload = {
          ...filter,
          pagenumber: Math.floor(startRow / pagesize),
          pagesize,
        }

        if (searchText) {
          payload.searchText = searchText
        }

        const { data } = await loadData(payload)

        console.log("=> loaded data", data)

        successCallback(data)

        // this.$nextTick(() => {
        //   this.autoSizeAll()
        // })
      }

      this.gridApi.setDatasource({
        getRows,
      })
    },
    async onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi

      this.setColumns()
      this.setDatasource()
    },
    autoSizeAll(skipHeader) {
      const allColumnIds = []

      this.gridColumnApi.getColumns().forEach((column) => {
        allColumnIds.push(column.getId())
      })
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader)
    },
    onCellClicked(params) {
      if (params.column.getColId() == "action") {
        const cellRendererInstances = params.api.getCellRendererInstances({
          rowNodes: [params.node],
          columns: [params.column],
        })
        if (cellRendererInstances.length > 0) {
          const instance = cellRendererInstances[0]
          instance.togglePopup()
        }
      }
    },
    search() {
      this.setDatasource()
    },
    submitFilter() {
      this.setDatasource()
    },
    resetFilter() {
      this.filter = {
        restaurant: [],
        enabled: [],
        roles: [],
        permissions: [],
        inviteStatus: [],
      }

      this.filterPopupVisible = false
      this.activeFilterPopupItem = ""

      this.submitFilter()
    },
    showFilterPopup() {
      this.filterPopupVisible = true
    },
    closeFilterPopup() {
      this.filterPopupVisible = false
      this.activeFilterPopupItem = ""
    },
    toggleActiveFilterPopupItem(value) {
      this.activeFilterPopupItem =
        this.activeFilterPopupItem === value ? "" : value
    },
    getCheckStatus(key, value) {
      return this.filter[key]?.includes(value)
    },
    toggleCheckStatus(key, value) {
      const f = this.filter[key]

      if (!f) {
        return
      }

      const i = f.indexOf(value)

      if (i !== -1) {
        f.splice(i, 1)
      } else {
        f.push(value)
      }
    },
    applyFilter() {
      this.filterPopupVisible = false
      this.activeFilterPopupItem = ""
      this.submitFilter()
    },
  },
}
</script>

<template>
  <div>
    <div class="container">
      <div class="headerbar">
        <button class="headerbar-new-btn">New Team Member</button>
      </div>
      <div class="ag-header">
        <div class="ag-header-info">
          <div class="ag-header-logo" v-html="iconRestaurant"></div>
          <strong>My Team Members</strong>
        </div>
        <div class="searchbar">
          <div class="searchbar-input-box">
            <input
              class="searchbar-input"
              type="text"
              v-model="searchText"
              @keyup.enter="search"
            />
            <span
              class="searchbar-icon"
              v-html="iconSearch"
              @click="search"
            ></span>
            <span class="searchbar-placeholder">search</span>
          </div>
          <p class="searchbar-tips">
            Enter either First Name, Last name, Email address, Role Type, or
            Restaurant Number.
          </p>
        </div>
      </div>
    </div>
    <div class="ag-body">
      <div class="container">
        <div class="filterbar">
          <label class="filterbar-label"
            >{{ config["restaurantlisting.filter.label"] }}:</label
          >
          <div class="filterbar-content">
            <div class="filterbar-item">
              <filter-select
                placeholder="Restaurants"
                :options="restaurantOptions"
                v-model="filter.restaurant"
                size="auto"
                style="min-width: 170px"
                @change="submitFilter"
              />
            </div>
            <div class="filterbar-item">
              <filter-select
                placeholder="Enabled"
                :options="enabledOptions"
                v-model="filter.enabled"
                size="auto"
                style="min-width: 124px"
                @change="submitFilter"
              />
            </div>
            <div class="filterbar-item">
              <filter-select
                placeholder="Roles"
                :options="rolesOptions"
                v-model="filter.roles"
                size="auto"
                style="min-width: 247px"
                @change="submitFilter"
              />
            </div>
            <div class="filterbar-item">
              <filter-select
                placeholder="Permissions"
                :options="permissionOptions"
                v-model="filter.permissions"
                size="auto"
                style="min-width: 163px"
                @change="submitFilter"
              />
            </div>
            <div class="filterbar-item">
              <filter-select
                placeholder="Invite Status"
                :options="inviteStatusOptions"
                v-model="filter.inviteStatus"
                size="auto"
                style="min-width: 247px"
                @change="submitFilter"
              />
            </div>
          </div>
          <div class="filterbar-clear" @click="resetFilter">
            Clear All Filters
          </div>
        </div>
        <div class="filter-list-container">
          <div class="filter-list-box" @click="showFilterPopup">
            <span class="filter-list-text">Filter list</span>
            <span class="filter-list-icon" v-html="iconFilter"></span>
          </div>
        </div>
        <div
          :class="`filter-popup-container ${
            filterPopupVisible ? 'active' : ''
          }`"
        >
          <div class="filter-popup-mask" @click="closeFilterPopup"></div>
          <div class="filter-popup-box">
            <div class="filter-popup-list">
              <div
                v-for="item in filterConfig"
                :key="item.key"
                :class="`filter-popup-item ${
                  activeFilterPopupItem === item.key ? 'active' : ''
                }`"
              >
                <div
                  class="filter-popup-item-header"
                  @click="toggleActiveFilterPopupItem(item.key)"
                >
                  <div class="filter-popup-item-title">
                    <strong>{{ item.title }}</strong>
                    <span
                      class="filter-popup-item-tag"
                      v-show="filter[item.key].length"
                      >{{ filter[item.key].length }} select</span
                    >
                  </div>
                  <span
                    class="filter-popup-icon-collapse"
                    v-show="activeFilterPopupItem !== item.key"
                    v-html="iconDownGreen"
                  ></span>
                  <span
                    class="filter-popup-icon-collapse"
                    v-show="activeFilterPopupItem === item.key"
                    v-html="iconUpGreen"
                  ></span>
                </div>
                <div class="filter-popup-item-body">
                  <div class="filter-popup-select-option-list">
                    <div
                      class="filter-popup-select-option"
                      v-for="option in restaurantOptions"
                      :key="option.label"
                      @click="toggleCheckStatus(item.key, option.value)"
                    >
                      <span class="filter-popup-select-text">{{
                        option.label
                      }}</span>
                      <span
                        class="filter-popup-select-check-icon"
                        v-show="getCheckStatus(item.key, option.value)"
                        v-html="iconCheckboxChecked"
                      ></span>
                      <span
                        class="filter-popup-select-check-icon"
                        v-show="!getCheckStatus(item.key, option.value)"
                        v-html="iconCheckbox"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="filter-popup-footer">
              <div class="filter-popup-clear" @click="resetFilter">
                Clear All Filters
              </div>
              <div class="filter-popup-btn" @click="applyFilter">
                Apply Filters
              </div>
            </div>
          </div>
        </div>
        <ag-grid-vue
          class="ag-theme-balham"
          style="width: 100%; height: 500px"
          :column-defs="columnDefs"
          row-model-type="infinite"
          :header-height="0"
          :row-height="120"
          :row-buffer="0"
          :cache-block-size="10"
          :cache-overflow-size="1"
          :max-concurrent-datasource-requests="1"
          :max-blocks-in-cache="10"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Nexa";
}

.container {
  width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 988px) {
  .container {
    width: 900px;
  }
}
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}

svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.person-email-address {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: normal;
  font-size: 16px;
  line-height: 30px;
  color: #00a8eb;
}
</style>

<style scoped>
.headerbar {
  display: flex;
  justify-content: flex-end;
  padding: 50px 0;
}
.headerbar-new-btn {
  width: 280px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  color: #fff;
  background-color: #009132;
  border: none;
  outline: none;
}
@media screen and (max-width: 768px) {
  .headerbar {
    display: none;
  }
}
.ag-header {
  display: flex;
  align-items: center;
  padding-bottom: 110px;
}
@media screen and (max-width: 988px) {
  .ag-header {
    padding-bottom: 80px;
  }
}
@media screen and (max-width: 768px) {
  .ag-header {
    display: block;
    padding: 35px 14px 18px;
  }
}
.ag-header-info {
  display: flex;
  align-items: center;
}
.ag-header-logo {
  font-size: 60px;
  color: #00000029;
}
@media screen and (max-width: 988px) {
  .ag-header-logo {
    font-size: 45px;
  }
}
@media screen and (max-width: 768px) {
  .ag-header-logo {
    font-size: 32px;
  }
}
.ag-header-logo >>> svg {
  display: block;
}
.ag-header-info strong {
  display: inline-block;
  margin-left: 30px;
  font-size: 45px;
  color: #555555;
}
@media screen and (max-width: 988px) {
  .ag-header-info strong {
    font-size: 30px;
  }
}
@media screen and (max-width: 768px) {
  .ag-header-info strong {
    margin-left: 10px;
    font-size: 22px;
    line-height: 44px;
  }
}
.searchbar {
  position: relative;
  margin-left: 36px;
}
@media screen and (max-width: 768px) {
  .searchbar {
    margin-left: 0;
  }
}
.searchbar-input-box {
  position: relative;
  width: 474px;
  height: 65px;
}
@media screen and (max-width: 768px) {
  .searchbar-input-box {
    width: 100%;
    height: 50px;
  }
}
.searchbar-input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #707070a5;
  border-bottom: 2px solid #009132;
  font-size: 27px;
  padding: 0 10px;
  padding-top: 20px;
  color: #959595;
  background-color: #efefef;
  outline: none;
}
.searchbar-icon {
  position: absolute;
  top: 12px;
  right: 24px;
  z-index: 1;
  font-size: 36px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .searchbar-icon {
    right: 16px;
    font-size: 25px;
    color: rgba(85, 85, 85, 0.24);
  }
}
.searchbar-placeholder {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: #009132;
}
.searchbar-tips {
  position: absolute;
  left: 0;
  top: 65px;
  width: 100%;
  margin: 0;
  padding: 12px 0;
  font-size: 16px;
  line-height: 20px;
  color: #555555;
  white-space: normal;
}
@media screen and (max-width: 768px) {
  .searchbar-tips {
    position: static;
  }
}
.ag-body {
  background-color: rgba(85, 85, 85, 0.05);
}
@media screen and (max-width: 768px) {
  .ag-body {
    background-color: #fff;
  }
}
.filterbar {
  display: flex;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 32px;
}
@media screen and (max-width: 988px) {
  .filterbar {
    display: none;
  }
}
.filterbar-label {
  flex: 0 0 auto;
  margin-right: 18px;
  font-size: 18px;
  line-height: 22px;
  color: #555555;
}
.filterbar-content {
  display: flex;
  align-items: center;
}
.filterbar-item {
  margin-right: 24px;
}
.filterbar-clear {
  font-size: 16px;
  text-decoration: underline;
  color: #00a8eb;
}
.filter-list-container {
  display: none;
  padding: 30px 0;
}
@media screen and (max-width: 988px) {
  .filter-list-container {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .filter-list-container {
    padding: 14px;
  }
}
.filter-list-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 40px;
  line-height: 40px;
  box-shadow: 0px 3px 3px #0000001a;
  padding: 0 14px;
  box-sizing: border-box;
  border: 1px solid #999999;
  border-radius: 3px;
  background-color: #fff;
}
@media screen and (max-width: 768px) {
  .filter-list-box {
    width: 100%;
  }
}
.filter-list-text {
  font-size: 16px;
  color: #555;
}
.filter-list-icon {
  display: block;
  width: 30px;
  height: 30px;
  font-size: 30px;
}
.filter-popup-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: none;
  width: 100%;
  height: 100%;
}
.filter-popup-container.active {
  display: block;
}
.filter-popup-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.49;
}
.filter-popup-box {
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: #fff;
}
.filter-popup-list {
  padding: 40px 20px 74px;
}
.filter-popup-item {
  margin-bottom: 5px;
  background-color: #f4f4f4;
}
.filter-popup-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 45px;
  border-radius: 5px;
}
.filter-popup-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 auto;
  margin-right: 50px;
}
@media screen and (max-width: 768px) {
  .filter-popup-item-title {
    margin-right: 20px;
  }
}
.filter-popup-item-header strong {
  font-size: 16px;
  color: #555555;
}
.filter-popup-item-tag {
  padding: 4px 8px;
  font-size: 14px;
  color: #009132;
  border-radius: 5px;
  background-color: #e3e3e3;
}
.filter-popup-icon-collapse {
  font-size: 16px;
}
.filter-popup-item-body {
  display: none;
}
.filter-popup-item.active .filter-popup-item-body {
  display: block;
}
.filter-popup-select-option-list {
  border-top: 1px solid rgba(112, 112, 112, 0.17);
  padding: 10px 0;
  margin: 0 10px;
}
.filter-popup-select-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  cursor: pointer;
}
.filter-popup-select-option:after {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 0;
  content: "";
  border-bottom: 1px dashed rgba(112, 112, 112, 0.17);
}
.filter-popup-select-text {
  position: relative;
  z-index: 999;
  padding-left: 10px;
  padding-right: 20px;
  font-size: 14px;
  line-height: 18px;
  color: #555555;
  background-color: #f4f4f4;
}
.filter-popup-select-check-icon {
  position: relative;
  z-index: 999;
  width: 18px;
  height: 18px;
  font-size: 18px;
  background-color: #fff;
}
.filter-popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  padding: 0 18px;
  border-top: 1px solid #ededed;
}
.filter-popup-clear {
  font-size: 16px;
  text-decoration: underline;
  color: #11aaeb;
}
.filter-popup-btn {
  width: 156px;
  height: 44px;
  margin-left: 48px;
  color: #fff;
  line-height: 44px;
  text-align: center;
  background-color: #009132;
}
</style>
