<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input"
      @submit.native.prevent
    >
      <el-form-item
        :label="$attrs.name"
        :rules="$attrs.props.rules"
        :class="{isRequired: !isRequired}"
        prop="newValue"
        class="item"
      >
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
          v-bind="$attrs.props"
          :default-checked-keys="form.newValue"
          @check="check"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span
          v-if="$attrs.props.operation"
          class="btns">
          <el-button
            type="text"
            size="mini"
            @click.native.stop="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.native.stop="() => remove(node, data)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.native.stop="handleEdit(node, data)">
            编辑
          </el-button>
        </span>
      </span>
        </el-tree>
      </el-form-item>
    </el-form>
    <EditName
      v-if="isEditShow"
      :visible.sync="isEditShow"
      :value.sync="editName"
      @success="onEditName"
    />
  </div>
</template>

<script>
import EditName from './components/editName'
import { common } from '../../mixins/common'
let id = 1000
export default {
  name: 'ImTree',
  mixins: [common],
  components: {
    EditName
  },
  watch: {
    value: {
      handler (vl) {
        if (vl && typeof vl === 'string') {
          const data = JSON.parse(vl)
          this.form.newValue = data
        } else if (typeof vl === 'object') {
          this.form.newValue = vl
        }
      },
      deep: true,
      immediate: true
    },
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
        if (vl === '' && this.oldForm) {
          this.form = this.oldForm
        }
      },
      deep: true
    }
  },
  data () {
    return {
      isEditShow: false,
      editName: '',
      editNode: null, // 正在编辑的节点
      form: {
        newValue: ''
      },
      oldForm: null
    }
  },
  methods: {
    onEditName (name) {
      this.editNode.label = name
    },
    handleEdit (node, data) {
      console.log(node, data)
      this.isEditShow = true
      this.editName = data.label
      this.editNode = data
    },
    check (res, res1, res2, res3) {
      // 获取选中节点数组
      let arr = this.$refs.tree.getCheckedNodes()
      this.form.newValue = arr

      this.isClearVilidate()
    },
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    // 时时校验-校验通过清除提示
    isClearVilidate () {
      if (this.isVilidate()) {
        const fn = setTimeout(() => {
          this.formClearValidate()
          clearTimeout(fn)
        }, 10)
      }
    },
    // 是否校验通过
    isVilidate () {
      // 所有分数字段必须填写
      let state = true
      if (this.isRequired && this.form.newValue.length === 0) { state = false }
      return state
    },
    validate () {
      let state = false
      // 判断字段是否数据正确，如果正确的话校验通过，否则校验不过
      this.oldForm = JSON.parse(JSON.stringify(this.form))
      if (this.isVilidate()) {
        this.form.newValue = JSON.stringify(this.form.newValue)
      } else {
        this.form.newValue = ''
      }
      state = true
      // 只有分数段 存在才做校验
      this.$refs.form.validate((res) => {
        state = res
      })
      return state
    }
  }
}
</script>

<style scoped>
.form-input{
  display: flex;
  flex-direction: row;
}
.item{
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 20px;
}
.item >>> .el-form-item__content{
  /*width: 60%;*/
}
.isRequired{
  padding-left: 10px;
}
.btns{margin-left: 30px;}
</style>
