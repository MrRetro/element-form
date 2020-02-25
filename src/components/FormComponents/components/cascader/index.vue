<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="$attrs.name"
        :class="{isRequired: !isRequired}"
        :rules="$attrs.props.rules"
        prop="newValue"
        class="item"
      >
        <el-cascader
          v-bind="$attrs.props"
          :options="newOptions"
          v-model="form.newValue"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImCascader',
  mixins: [common],
  data () {
    return {
      form: {
        newValue: typeof this.value === 'string' ? this.value.split(',') : this.value
      }
    }
  },
  computed: {
    newOptions () {
      let list = this.$attrs.options || []
      if (Array.isArray(this.$attrs.options)) {
        const oldOpt = JSON.stringify(this.$attrs.options)
        console.log(oldOpt)
        list = oldOpt.replace(/value/g, 'label')
        list = JSON.parse(list.replace(/key/g, 'value'))
      }
      return list
    }
  },
  watch: {
    value: {
      handler (vl) {
        this.form.newValue = typeof vl === 'string' ? vl.split(',') : vl
      },
      deep: true,
      immediate: true
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
.isRequired{
  padding-left: 10px;
}
</style>
