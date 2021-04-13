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
          <el-button
            v-bind="$attrs.props"
            v-for="(item, index) in $attrs.options"
            :key="index"
             @click="$emit('onInput', form.newValue, item.key)"
          >{{item.value}}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImBtns',
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
