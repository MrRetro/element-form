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
        <el-switch
          v-bind="$attrs.props"
          v-model="form.newValue"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {common} from '../../mixins/common'

export default {
  name: 'ImSwitch',
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
  .item >>> .el-form-item__content{
    align-items: center;
    justify-content: center;
  }
.isRequired{
  padding-left: 10px;
}
</style>
