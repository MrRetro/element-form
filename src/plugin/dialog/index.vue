<template>
  <el-dialog
    class="z-dialog"
    :visible.sync="visible"
    v-bind="props"
    :title="title"
    :before-close="destroy"
  >
    <ElementForm
      ref="form"
      class="element-form"
      :class="{
        column: ['column'].includes(formAlign),
        'grid-half': ['2'].includes(grid)
      }"
      :form.sync="formData"
      @onAttr="onAttr"
    />
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="destroy">取 消</el-button>
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ElementForm from '../../components/FormComponents'
export default {
  name: 'dialog',
  components: {
    ElementForm
  },
  data () {
    return {
      visible: false,
      title: '',
      props: {},
      formData: [],
      formAlign: '', // 表单排版 column 为上下排版
      grid: '', // 1列、2列、3列...
      onChange: null,
      onCallback: null
    }
  },
  methods: {
    create ({props, title, formData, formAlign, grid, onChange, onCallback}) {
      this.title = title
      this.props = props || {}
      this.formData = formData
      this.formAlign = formAlign
      this.grid = grid
      this.onChange = onChange
      this.onCallback = onCallback
      this.open()
    },
    setFormData (data) {
      this.formData = data
    },
    getFormData () {
      return this.formData
    },
    open () {
      this.visible = true
    },
    destroy () {
      this.visible = false

      const fn = setTimeout(() => {
        this.props = {}
        this.formData = []
        this.formAlign = ''
        this.grid = ''
        this.onChange = null
        this.onCallback = null
        clearTimeout(fn)
      }, 300)
    },
    onAttr (item, target, index) {
      if (this.onChange) this.onChange(this, item, target, index)
    },
    submit () {
      const target = this.$refs.form
      const state = target.validateForm()
      if (state && this.onCallback) {
        const obj = {}
        target.getFormValue().forEach(v => {
          if (v.attr) obj[v.attr] = v.value
        })
        this.onCallback(this, obj)
      }
    }
  }
}
</script>

<style scoped>
.z-dialog >>> .el-dialog__body {
  padding: 16px 24px;
}
.z-dialog >>> .item{
  margin-bottom: 16px;
}
.z-dialog >>> .el-form-item__content{
  display: flex;
  flex: 1;
}
.z-dialog >>> .el-dialog__footer{
  height: initial;
  line-height: initial;
  padding-bottom: 20px !important;
}
.z-dialog >>> .element-form.column .item {
  display: flex;
  flex-direction: column;
  padding-left: 0px;
}
.z-dialog >>> .element-form.column .el-form-item__label {
  text-align: left;
}
.z-dialog >>> .element-form.column .el-select {
  display: flex;
  flex: 1;
}
.z-dialog >>> .element-form.grid-half {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.z-dialog >>> .element-form.grid-half .component{
  width: 47.5%;
}
.z-dialog >>> .element-form.grid-half .component{
  width: 47.5%;
}
.z-dialog >>> .element-form.grid-half div[type='SelectClazzView']{
  width: 210.5% !important;
  flex-shrink: 0;
}
</style>
