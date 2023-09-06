<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="props"
    :title="title"
  >
    <FormComponents
      ref="form"
      :form.sync="formData"
      v-bind="formProps"
      @onAttr="onAttr"
    />
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="destroy">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FormComponents from '../../components/FormComponents'
export default {
  name: 'index',
  components: {
    FormComponents
  },
  data () {
    return {
      visible: false,
      title: '',
      props: {},
      formData: [],
      formProps: {},
      onChange: null,
      onCallback: null
    }
  },
  methods: {
    create ({props, title, formData, formProps, onChange, onCallback}) {
      this.title = title
      this.props = props || {}
      this.formData = formData
      this.formProps = formProps || {}
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

      this.props = {}
      this.formData = []
      this.formProps = {}
      this.onChange = null
      this.onCallback = null
    },
    onAttr (item, target, index) {
      this.onChange && this.onChange(this, item, target, index)
    },
    submit () {
      const target = this.$refs.form
      const state = target.validateForm()

      if (state) {
        this.onCallback && this.onCallback(this, target.getFormValues())
      }
    }
  }
}
</script>

<style scoped>

</style>
