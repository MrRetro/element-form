<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input"
      @submit.native.prevent
    >
      <el-form-item
        :label="$attrs.name"
        :rules="$attrs.props.rules"
        :class="{isRequired: !isRequired}"
        prop="newValue"
        class="item"
      >
        <el-input
          v-bind="$attrs.props"
          v-model="form.newValue"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImInput',
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
  /*width: 60%;*/
}
.isRequired{
  padding-left: 10px;
}
</style>
