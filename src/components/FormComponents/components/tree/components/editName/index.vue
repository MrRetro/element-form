<template>
  <el-dialog
    title="修改名称"
    :visible.sync="dialogVisible"
    width="30%"
    :append-to-body="true"
    :before-close="handleClose">
    <ElementForm
      ref="form"
      :form="form"
    />
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import ElementForm from '../../../../index'
export default {
  name: 'editName',
  components: {
    ElementForm
  },
  props: {
    visible: Boolean,
    value: String
  },
  watch: {
    visible (vl) { this.dialogVisible = vl },
    dialogVisible (vl) { this.$emit('update:visible', vl) },
    value (vl) { this.form.value = vl },
    'form.value': {
      handler (vl) {
        this.$emit('update:value', vl)
      }
    }
  },
  data () {
    return {
      form: [
        {
          'name': '名称',
          'value': this.value,
          'type': 'Input',
          'props': {
            'placeholder': '请输入',
            'rules': {
              'required': true,
              'message': '请输入',
              'target': 'blur'
            }
          }
        }
      ],
      dialogVisible: this.visible
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    submit () {
      let state = this.$refs.form.validateForm()
      if (state) {
        this.$emit('success', this.form[0].value)
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>

</style>
