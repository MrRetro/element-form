<template>
  <div>
    <div
      v-for="(item,index) in newForm"
      :key="index"
      :class="{'is-config':isShowConfig}"
      class="component"
    >
      <FormComponents
        ref="form"
        v-bind="item"
        :value="item.value"
        :index="index"
        @onInput="onInput"
      />
      <span
        v-if="isDelete"
        class="close"
        @click="close(index)">x</span>

      <div
        v-if="typeParent !=='YourselfDiy' && item.type !=='YourselfDiy' && isShowConfig"
        class="config-box"
      >
        <span>参数配置</span>
        <table>
          <tbody>
            <tr><td>key值</td><td><el-input v-model="item.attr"/></td></tr>
            <tr><td>名称</td><td><el-input v-model="item.name"/></td></tr>
            <tr v-if="item.options">
              <td style="text-align:center;vertical-align:middle;">选项</td>
              <td>
                <SelectContentEdit
                  :value="item.options"
                />
              </td>
            </tr>
            <tr><td>必填</td><td><el-switch v-model="item.props.rules.required"/></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <p
      v-if="subName"
      class="btn-box">
      <el-button
        @click="validateForm"
      >{{ subName }}</el-button>
    </p>
  </div>
</template>

<script>
import SelectContentEdit from './SelectContentEdit/index.vue'
import FormComponents from './form.vue'

export default {
  name: 'FormCom',
  components: {
    SelectContentEdit,
    FormComponents
  },
  props: {
    isShowConfig: {
      type: Boolean,
      default: false
    },
    typeParent: String,
    isDelete: {
      type: Boolean,
      default: false
    },
    subName: String,
    form: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      newForm: this.form
    }
  },
  watch: {
    form: {
      handler (vl) {
        this.newForm = vl
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onInput (target, index, item) {
      this.newForm[index].value = target

      this.$emit('onForm', this.newForm)
      // 回调通知组件变更
      if (item) {
        this.$emit('onAttr', item)
      }
    },
    getFormValue () {
      return this.newForm
    },

    // 表单校验
    validateForm () {
      let state = true
      try {
        if (({}).toString.call(this.$refs.form) === '[object Array]') {
          this.$refs.form.forEach((v) => {
            if (v.validate() === false) {
              state = false
            }
          })
        }
      } catch (e) {
        console.log('err==>', e)
      }
      return state
    },
    // 删除
    close (index) {
      this.$emit('onDelete', index)
    }
  }
}
</script>

<style scoped>
.btn-box{
  display: flex;
  padding: 20px;
}
.btn-box >>> .el-button{
  box-shadow: 0 2px 12px 0px rgba(0,0,0,.1);
}
.component{
  position: relative;
}
.component .is-config{
  display: flex;
  justify-content: space-between;
}
.component >>> .form{
  display: flex;
  flex: 1;
}
.close{
  position: absolute;
  top: -6px;
  right: 0px;
  background-color: #F56C6C;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  z-index: 101;
}
.form >>> .form-input{
  width: initial;
}
  .config-box{
    opacity: .5;
    transform: scale(.8);
  }
.component >>> .el-form-item__label{
  min-width: 65px;
}
</style>
