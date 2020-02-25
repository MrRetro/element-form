<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="$attrs.name"
        :rules="$attrs.props.rules"
        :class="{isRequired: !isRequired}"
        prop="newValue"
        class="item"
      >
        <el-checkbox-group
          v-model="form.newValue"
        >
          <el-checkbox
            v-for="(item) in $attrs.options"
            :label="`${item.value}`"
            :key="item.key"
            v-bind="$attrs.props"
          />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImCheckBox',
  mixins: [common],
  data () {
    return {
      form: {
        newValue: this.$attrs.value || []
      }
    }
  }
}
</script>

<style scoped>
.form-input >>> .el-checkbox{
  margin-right: 0px;
}
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
