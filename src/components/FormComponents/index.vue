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
        v-if="item.type === 'YourselfList' && isShowConfig"
        style="width: 500px;"
        class="config-box config-box2"
      >
        <span style="color: #ff81a7;">{{ item.value.data[item.value.curMode].name }}</span>
        <div class="tb-box">
          <div>
            <div><span>key值</span><span><el-input v-model="item.value.data[item.value.curMode].attr"/></span></div>
            <div><span>名称</span><span><el-input v-model="item.value.data[item.value.curMode].name"/></span></div>
          </div>
        </div>
        <div
          v-for="(item1,index1) in item.value.data[item.value.curMode].value"
          :key="'index1'+index1"
        >
          <span style="color: #fc8fff;">分组{{ index1 }}</span>
          <div class="tb-box">
            <div>
              <div><span>key值</span><span><el-input v-model="item1.attr"/></span></div>
              <div><span>名称</span><span><el-input v-model="item1.name"/></span></div>
              <div>
                <div>
                  <div
                    v-for="(item2,index2) in item1.value"
                    :key="'index2'+index2"
                  >
                    <span style="color: #00bfff;">队列{{ index2 }}</span>
                    <div class="tb-box">
                      <div>
                        <div><span>key值</span><span><el-input v-model="item2.attr"/></span></div>
                        <div><span>名称</span><span><el-input v-model="item2.name"/></span></div>
                        <div>
                          <div>
                            <div
                              v-for="(item3,index3) in item2"
                              :key="'index3'+index3"
                            >
                              <span style="color: #16b002;">组件</span>
                              <div class="tb-box">
                                <div>
                                  <div><span>key值</span><span><el-input v-model="item3.attr"/></span></div>
                                  <div><span>名称</span><span><el-input v-model="item3.name"/></span></div>
                                  <div v-if="item3.options">
                                    <span style="text-align:center;vertical-align:middle;">选项</span>
                                    <span>
                                        <SelectContentEdit
                                          :value="item3.options"
                                        />
                                      </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
.config-box2{
  display: flex;
  flex-direction: column;
  border: 1px dashed #a1a1a1;
  border-radius: 4px;
  padding: 10px;
}
.component >>> .el-form-item__label{
  min-width: 65px;
}
</style>
