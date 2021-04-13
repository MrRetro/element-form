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
        <div class="input-box">
          <el-input
            v-bind="$attrs.props"
            v-model="form.newValue"
          />
          <span class="icon-box" @click="$emit('onInput', form.newValue, 'btn')">
            试听
            <i class="icon el-icon-headset"></i>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImTextareaIcon',
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
.input-box{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.icon-box{
  width: 80px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
