<template>
  <div>
    <div
      v-for="(item,index) in newForm"
      :key="index"
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
    </div>
    <p class="btn-box">
      <el-button
        v-if="subName"
        @click="validateForm"
      >{{subName}}</el-button>
    </p>
  </div>
</template>

<script>
import FormComponents from './form'
export default {
  name: 'FormCom',
  components: {
    FormComponents
  },
  props: {
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
  watch: {
    form: {
      handler (vl) {
        this.newForm = vl
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      newForm: this.form
    }
  },
  methods: {
    onInput (target, index, item) {
      this.newForm[index].value = target

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
.component{
  position: relative;
}
.close{
  position: absolute;
  top: -6px;
  background-color: #F56C6C;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
}
</style>
