<template>
  <div class="container-table">
    <slot name="table-top"></slot>
    <div class="filter-box">
      <div class="left-box">
        <p v-if="tableTitle" class="table-title">{{tableTitle}}</p>
        <p v-if="tableSubTitle" class="table-title">{{tableSubTitle}}</p>
        <FilterComp
          v-if="filterOptions"
          :data.sync="filterOptions"
          @onFilterComp="onFilterComp" />
      </div>
      <div class="right-box">
        <slot name="filterRight"></slot>
        <Btns :form.sync="filterRightBtns" @onBtns="onBtns" />
      </div>
    </div>
    <el-table
      class="im-table"
      v-loading="newIsLoading"
      :data="getNewTableData"
      style="width: 100%;"
      :row-class-name="rowClassName"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @row-click="rowClick"
      @sort-change="sortChange">
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        fixed="left">
      </el-table-column>
      <el-table-column
        v-if="isOrder"
        prop="orderNumberUp"
        label="序号"
        width="55"
        fixed="left" />
      <template v-for="(item,index) in tableHead">
        <el-table-column
          v-if="['operation'].includes(item.prop)"
          :key="index"
          v-bind="item">
          <template slot-scope="scope">
            <div v-if="scope.row.operation">
              <el-link
                style="margin-right: 10px"
                :class="{haveLine: index1}"
                type="primary"
                v-for="(item1, index1) in scope.row.operation.slice(0, 3)"
                :key="`item1` + index1"
                @click="onBtns(item1, scope.row, scope.row.number)">
                <span v-if="index1" class="line">|</span>{{item1.value}}
              </el-link>
              <el-dropdown v-if="scope.row.operation.slice(3) && scope.row.operation.slice(3).length>0" @command="onBtns">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item2,index2) in scope.row.operation.slice(3)"
                    :key="`item2`+ index2"
                    :command="item2"
                  >{{item2.value}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.isSlot"
          :key="index"
          v-bind="item">
          <template slot-scope="scope">
            <slot :name="`${item.prop}$Slot`" :item="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.isForm"
          :key="index"
          v-bind="item">
          <template slot-scope="scope">
            <ElementForm
              v-if="scope.row[`${item.prop}Config`]"
              :form="[scope.row[`${item.prop}Config`]]"
              @onAttr="onCellAttr($event, item, index)" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          v-bind="item">
          <template slot-scope="scope">
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="isPage"
      class="pages">
      <el-pagination
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="newPagination.currentPage"
        :page-size="parseInt(newPagination.pageSize)"
        :total="newPagination.total"
        v-bind="tablePageProps"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import FilterComp from './components/filterComp'
import Btns from './components/btns/index.vue'
export default {
  name: 'mtable',
  components: {
    FilterComp,
    Btns
  },
  props: {
    // 是否加载
    isLoading: {
      type: Boolean,
      default: false
    },
    filterOptions: Array, // 过滤表单配置
    // 表格标题
    tableTitle: {
      type: String,
      default: ''
    },
    // 表格副标题
    tableSubTitle: {
      type: String,
      default: ''
    },
    // 筛选右边按钮集合 [{key, value}]
    filterRightBtns: Array,
    // 是否支持多选
    selection: {
      type: Boolean,
      default: false
    },
    // 是否有序号
    isOrder: {
      type: Boolean,
      default: false
    },
    // 是否分页
    isPage: {
      type: Boolean,
      default: false
    },
    // 表格头
    tableHead: Array,
    // 表格数据
    tableData: Array,
    rowClassName: {
      type: Function,
      default: () => {}
    },
    // 分页参数
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 10
        }
      }
    },
    // 表格分页属性
    tablePageProps: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 从新计算表格数据
    getNewTableData () {
      const data = this.newTableData
      if (this.isOrder) {
        data.map((v, i) => {
          v.number = i
          v.orderNumberUp = i + 1
        })
      }
      return data
    }
  },
  watch: {
    isLoading (vl) { this.newIsLoading = vl },
    newIsLoading (vl) { this.$emit('update:isLoading', vl) },
    tableHead (vl) { this.newTableHead = vl },
    newTableHead (vl) { this.$emit('update:tableHead', vl) },
    tableData (vl) { this.newTableData = vl },
    newTableData (vl) { this.$emit('update:tableData', vl) },
    pagination (vl) { this.newPagination = vl },
    newPagination (vl) { this.$emit('update:pagination', vl) }
  },
  data () {
    return {
      currentItem: null, // 当前正在编辑的行数据
      newIsLoading: this.isLoading,
      newTableHead: this.newTableHead,
      newTableData: this.tableData,
      newPagination: this.pagination
    }
  },
  methods: {
    // 单元格自定义表单回调
    onCellAttr (origin, item, index) {
      this.$emit('onCellAttr', origin, item, index)
    },
    onFilterComp (target, item, index) {
      this.$emit('onFilterComp', target, item, index)
    },
    rowClick (row) {
      this.$emit('onRowClick', row)
    },
    sortChange (column, prop, order) {
      this.$emit('sort-change', column, prop, order)
    },
    cellMouseEnter (row) {
      this.currentItem = row
    },
    onBtns (item, data, index) {
      const newData = this.currentItem || data
      this.$emit('onBtns', item, newData, index)
    },
    handleSelectionChange (value) {
      this.$emit('selection-change', value)
    },
    currentChange (page) {
      console.log('currentChange', page)
    }
  }
}
</script>

<style scoped>
  .im-table >>> .el-table__header tr{
    background-color: initial !important;
  }
  .im-table .haveLine{
    margin-left: 8px;
    position: relative;
  }
  .im-table .line {
    position: absolute;
    left: -10px;
    color: rgba(0, 0, 0, 0.09);
  }
  .container-table {
    padding: 24px;
    overflow-y: auto;
    background-color: white;
  }
  .container-table .filter-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .container-table .filter-box .table-title{
    font-size: 14px;
    color: #323232;
    font-weight: bold;
    margin-right: 160px;
  }
  .container-table .filter-box .left-box,
  .container-table .filter-box .right-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .container-table .filter-box .left-box{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }
  .container-table .filter-box .left-box .filter-group{
    margin-right: 10px;
  }
  .container-table .table-filter{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .container-table .pages{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 0px;
  }
  .container-table .el-dropdown-link{
    cursor: pointer;
  }
  .school-center .container-table{
    max-height: calc(100vh - 80px);
  }
  .school-center .im-table >>> .el-table__header tr{
    background-color: #F5F7FA !important;
  }
  .school-center >>> .el-table--border td,
  .school-center >>> .el-table--border th,
  .school-center >>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: none;
  }
  .school-center >>> .el-table--border,
  .school-center >>> .el-table--group{
    border: none;
  }
  .school-center >>> .el-table--border::after,
  .school-center >>> .el-table--group::after{
    background-color: white;
  }
  .school-center >>> .pages{
    justify-content: flex-end;
  }
</style>
