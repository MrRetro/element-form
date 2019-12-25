<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="$attrs.name"
        prop="newValue"
        class="item"
      />
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImTitle',
  props: {
    value: [String, Number]
  },
  data () {
    return {
      form: {
        newValue: this.value
      }
    }
  },
  watch: {
    value: {
      handler (vl) {
        this.form.newValue = vl
      },
      deep: true,
      immediate: true
    },
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
      },
      deep: true
    }
  },
  methods: {
    validate () {
      let state = false
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
.form-input >>> .el-form-item__label{
  font-weight: bold;
  color: #323232;
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
</style>
