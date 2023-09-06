<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="props"
    :title="title"
  >
    <el-button @click="handleClick">aaa</el-button>
  </el-dialog>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {
        visible: false,
        title: '',
        props: {},
        formData: [],
        onChange: null,
        onCallback: null
      }
    },
    methods: {
      create({props, title, formData, onChange, onCallback}){
        this.title = title
        this.props = props || {}
        this.formData = formData
        this.onChange = onChange
        this.onCallback = onCallback
        this.open()
      },
      setFormData(data){
        this.formData = data
      },
      getFormData(){
        return this.formData
      },
      open(){this.visible = true},
      destroy(){
        this.visible = false

        this.props = {}
        this.formData = []
        this.onChange = null
        this.onCallback = null
      },
      handleClick(){
        if(this.onChange) this.onChange(this, '111')
      }
    }
  }
</script>

<style scoped>

</style>
