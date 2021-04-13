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
        <Tree
          :options.sync="form.newValue.options"
          :curNode.sync="form.newValue.curNode"
          @onAdd="onAdd"
          @onEdit="onEdit"
          @onDelete="onDelete"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '../../mixins/common'
import Tree from './components/tree'

export default {
  name: 'ImPreTree',
  components: {
    Tree
  },
  mixins: [common],
  data () {
    return {
      form: {
        newValue: this.value
      }
    }
  },
  onAdd (item) {
    this.$emit('onInput', this.form.newValue, {type: 'onAdd', ...item})
  },
  onEdit (item) {
    this.$emit('onInput', this.form.newValue, {type: 'onEdit', ...item})
  },
  onDelete (item) {
    this.$emit('onInput', this.form.newValue, {type: 'onDelete', ...item})
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
