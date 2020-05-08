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
        <el-select
          v-bind="$attrs.props"
          v-model="form.newValue"
        >
          <el-option-group
            v-for="(item1, index1) in $attrs.options"
            :key="index1"
            :label="item1.value"
          >
            <el-option
              v-for="item in (item1.childrens||[])"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImSelectGroup',
  mixins: [common]
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
