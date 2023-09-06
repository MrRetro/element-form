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
        <el-radio-group
          v-bind="$attrs.props"
          v-model="form.newValue"
        >
          <el-radio-button
            v-for="item in $attrs.options"
            :label="`${item.key}`"
            :key="item.key"
          >{{ item.value }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImRadioGroup',
  mixins: [common]
}
</script>

<style scoped>
.form-input >>> .el-radio{
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
