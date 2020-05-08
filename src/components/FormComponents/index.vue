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
        :isAutoBind="isAutoBind"
        @onInput="onInput"
      />
      <span
        v-if="isDelete"
        class="close"
        @click="close(index)">x</span>
      <div class="configs" v-if="newForm">
        <!--普通配置-->
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
        <!--自定义队列-->
<!--        <div-->
<!--          v-if="item.type === 'YourselfList' && isShowConfig"-->
<!--          style="width: 500px;"-->
<!--          class="config-box config-box2"-->
<!--        >-->
<!--          <div-->
<!--            v-for="(item1,index1) in item.value.value"-->
<!--            :key="'index1'+index1"-->
<!--          >-->
<!--            <span style="color: #ff81a7;">队列{{index1}}</span>-->
<!--            <div-->
<!--              v-for="(item2,index2) in item1"-->
<!--              :key="'index2'+index2 + Math.random()"-->
<!--            >-->
<!--              <span style="color: #16b002;">组件{{index2}}</span>-->
<!--              <div class="tb-box">-->
<!--                <div>-->
<!--                  <div><span>key值</span><span><el-input v-model="item2.attr"/></span></div>-->
<!--                  <div><span>名称</span><span><el-input v-model="item2.name"/></span></div>-->
<!--                  <div v-if="item2.options">-->
<!--                    <span style="text-align:center;vertical-align:middle;">选项</span>-->
<!--                    <span>-->
<!--                        <SelectContentEdit-->
<!--                          :value="item2.options" />-->
<!--                      </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <!--自定义队列+模式-->
        <div
        v-if="item.type === 'YourselfListMode' && isShowConfig"
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
<!--        <div-->
<!--          v-for="(item1,index1) in item.value.data[item.value.curMode].value"-->
<!--          :key="'index1'+index1 + Math.random()"-->
<!--        >-->
<!--          <span style="color: #fc8fff;">组件{{ index1 }}</span>-->
<!--          <div class="tb-box">-->
<!--            <div>-->
<!--              <div>-->
<!--                <div v-for="(item3,index3) in item1.value"-->
<!--                  :key="'index3'+index3 + Math.random()">-->
<!--                  <div-->
<!--                    v-if="item3.type === 'YourselfList'"-->
<!--                    style="width: 500px;"-->
<!--                    class="config-box config-box2"-->
<!--                  >-->
<!--                    <div><span>key值</span><span><el-input v-model="item3.attr"/></span></div>-->
<!--                    <div><span>名称</span><span><el-input v-model="item3.name"/></span></div>-->
<!--                    &lt;!&ndash;队列配置&ndash;&gt;-->
<!--                    <div-->
<!--                      style="padding-left: 20px;"-->
<!--                      v-for="(item4,index4) in item3.value.value"-->
<!--                      :key="'index4'+index4 + Math.random()"-->
<!--                    >-->
<!--                      <span style="color: #ff81a7;">队列{{index4}}</span>-->
<!--                      <div-->
<!--                        v-for="(item5,index5) in item4"-->
<!--                        :key="'index5'+index5 + Math.random()"-->
<!--                      >-->
<!--                        <span style="color: #16b002;">组件{{index5}}</span>-->
<!--                        <div class="tb-box">-->
<!--                          <div>-->
<!--                            <div><span>key值</span><span><el-input v-model="item5.attr"/></span></div>-->
<!--                            <div><span>名称</span><span><el-input v-model="item5.name"/></span></div>-->
<!--                            <div v-if="item5.options">-->
<!--                              <span style="text-align:center;vertical-align:middle;">选项</span>-->
<!--                              <span>-->
<!--                                <SelectContentEdit-->
<!--                                  :value="item5.options" />-->
<!--                              </span>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  &lt;!&ndash;普通组件配置&ndash;&gt;-->
<!--                  <div v-else="">-->
<!--                    <div><span>key值</span><span><el-input v-model="item3.attr"/></span></div>-->
<!--                    <div><span>名称</span><span><el-input v-model="item3.name"/></span></div>-->
<!--                    <div v-if="item3.options">-->
<!--                      <span style="text-align:center;vertical-align:middle;">选项</span>-->
<!--                      <span>-->
<!--                        <SelectContentEdit-->
<!--                          :value="item3.options" />-->
<!--                      </span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
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
    },
    // 是否自动双向绑定数据
    isAutoBind: {
      type: Boolean,
      default: true
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
      console.log(9995, target)
      console.log(777, target)
      this.newForm[index].value = target

      this.$emit('onForm', this.newForm)
      // 回调通知组件变更
      if (item) {
        this.$emit('onAttr', item, target, index)
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
    },
    // 数据绑定(手动)
    onDataBind () {
      console.log(9991, this.$refs.form)

      if (this.$refs.form) {
        this.$refs.form.map(v => {
          v.onDataBind && v.onDataBind()
        })
      }
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
  opacity: .9;
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
