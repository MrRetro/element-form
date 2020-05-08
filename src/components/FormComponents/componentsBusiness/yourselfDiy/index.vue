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
        <div class="content-box2">
          <div
            v-for="(item1,index) in form.newValue.layout"
            :key="'lay'+index+Math.random()"
          >
            <el-select
              v-if="!item1.config"
              :filterable="true"
              v-model="item1.type"
              size="small"
              placeholder="请选择(不会被绘制)"
              class="select-box"
              @change="handleChange(index,item1.type)">
              <el-option
                v-for="(item,index) in newOptions"
                :key="'ops'+item.type+Math.random()"
                :label="item.name"
                :value="index"/>
            </el-select>
            <div :class="{'comp-box':item1.config}">
              <FormComp
                v-if="item1.config"
                :key="'form'+item1.type+Math.random()"
                :form="item1.config"
                type-parent="YourselfDiy"
              />
              <el-button
                v-if="item1.config"
                type="danger"
                class="del"
                size="small"
                @click="handleDelete(index)"
              >删除</el-button>
              <div class="zhezhao"/>
            </div>
          </div>
          <div class="view">
            <el-button
              type="primary"
              size="small"
              @click="()=>{isConfig=false;dialogVisible=true;preTitle='预览';}"
            >预览</el-button>
            <el-button
              type="primary"
              size="small"
              @click="()=>{isConfig=true;dialogVisible=true;preTitle='设置'}"
            >设置</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="preTitle"
      :append-to-body="true"
      width="1200px"
      @close="close">
      <FormComp
        ref="preForm"
        :form="preForm"
        :isAutoBind="false"
        :is-show-config="isConfig"
      />
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import configForm from '../../configForm'
import FormComp from '../../index.vue'

export default {
  name: 'ImYourselfDiy',
  components: {
    FormComp
  },
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      preTitle: '预览',
      isConfig: false, // 是否显示配置
      dialogVisible: false, // 是否显示弹窗
      options: configForm,
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      form: {
        newValue: {
          layout: [{ type: '', config: null }]
        }
      },
      oldForm: null,
      preForm: null // 预览数据
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    // 过滤表单选项,隐藏一些组件不让选择
    newOptions () {
      let list = this.options
      try {
        list = list.filter(v => !['YourselfDiy', 'YourselfDiyLeft', 'YourselfDiyCenter', 'YourselfDiyRight', 'Layout', 'Line', 'Button', 'Transfer', 'Upload'].includes(v.type) && `${v.status}` !== '2')
      } catch (e) {
        console.log('err==>', e)
      }
      return list
    },
    // 获取实际可以输出的配置
    getNewConfig () {
      let arr = []
      try {
        arr = JSON.parse(JSON.stringify(this.form.newValue.layout)).filter(v => v.config).map(v => v.config)
      } catch (e) {
        console.log('获取失败==>', e)
      }
      return arr
    }
  },
  watch: {
    value: {
      handler (vl) {
        if (vl && typeof vl === 'string') {
          const data = JSON.parse(vl)
          this.form.newValue = data
        } else if (typeof vl === 'object') {
          this.form.newValue = vl
        }
      },
      deep: true,
      immediate: true
    },
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
        if (vl === '' && this.oldForm) {
          this.form = this.oldForm
        }
        this.getNewForm()
        this.isClearVilidate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 确定
    submit () {
      this.onDataBind()
      let count = 0
      // 更新数据
      this.form.newValue.layout.map((v) => {
        if (v.config) {
          delete this.preForm[count].isConfig
          v.config = [this.preForm[count]]
          count += 1
        }
      })
      this.close()
    },
    getNewForm () {
      let arr = []
      let newArr = []
      try {
        console.log(666, this.form.newValue.layout)
        newArr = JSON.parse(JSON.stringify(this.form.newValue.layout)).filter(v => v.config)

        newArr.map((v) => {
          arr = arr.concat(v.config)
        })
        arr.map(v => { if (!v.isConfig) { v.isConfig = true } })
        this.preForm = arr
      } catch (e) {
        console.log('获取失败==>', e)
      }
    },
    // 选择获取组件
    handleChange (index, type) {
      // 获取选中的表单项
      const obj = {
        type,
        config: [this.newOptions[type]]
      }
      this.form.newValue.layout.splice(index, 1, {}, obj, {})
    },
    // 分数只能是数字
    inputChange (value) {
      value = value.replace(/[^\d]/g, '')
    },
    // 时时校验-校验通过清除提示
    isClearVilidate () {
      if (this.isVilidate()) {
        const fn = setTimeout(() => {
          this.formClearValidate()
          clearTimeout(fn)
        }, 10)
      }
    },
    // 是否校验通过
    isVilidate () {
      // 所有路径都必须有数据
      let state = true
      this.isRequired && this.form.newValue.forEach((v) => {
        Object.values(v).map((q) => {
          if (!q) state = false
        })
      })
      return state
    },
    validate () {
      let state = false
      // 判断字段是否数据正确，如果正确的话校验通过，否则校验不过
      this.oldForm = JSON.parse(JSON.stringify(this.form))
      if (this.isVilidate()) {
        this.form.newValue = JSON.stringify(this.form.newValue)
      } else {
        this.form.newValue = ''
      }
      state = true
      // 只有分数段 存在才做校验
      this.$refs.form.validate((res) => {
        state = res
      })
      return state
    },
    // 删除
    handleDelete (index) {
      this.form.newValue.layout.splice(index - 1, 3, {})
    },
    // 校验表单
    formValidate () {
      this.$refs.form && this.$refs.form.validate()
    },
    // 清除表单
    formClearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    },
    close () {
      this.dialogVisible = false
      this.isConfig = false
    },
    // 数据绑定(手动)
    onDataBind () {
      console.log(999, this.$refs.preForm)
      this.$refs.preForm.onDataBind && this.$refs.preForm.onDataBind()
    }
  }
}
</script>

<style scoped>
  >>> .is-config{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .warn{
    color: #ff2c2c;
    font-size: 12px;
  }
  .input-box .del >>> span{
    position: relative;
    top: -1px;
  }
  .box{
    width: 500px;
    color: #606266;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .content-box2{
    position: relative;
    min-width: 500px;
  }
  .content-box2 .box:last-of-type .content{
    margin-bottom: 0px;
  }
  .content-box2 .view{
    display: inline-block;
    position: absolute;
    top: 0px;
    right: 0vw;
  }
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
  .row-box{
    width: 100%;
    display: flex;
    padding: 0px 10px;
    flex-direction: column;
    border: 1px solid #eee;
    margin-bottom: 10px;
    border-radius: 4px;
    position: relative;
  }
  .row-box .del{
    position: absolute;
    right: 12px;
    top: 6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
  .select-box{
    width: 220px;
  }
  .row .select-box >>> .div{
    width: 220px;
    height: 40px;
  }

  .item >>> .iconfont{
    font-size: 22px;
  }
  .comp-box{
    width: 660px;
    border: 2px dashed #00bfff;
    margin: 10px 0px;
    padding: 20px;
    position: relative;
  }
  .comp-box .del{
    position: absolute;
    top: 8px;
    right: 22px;
    z-index: 11;
  }
  .comp-box .zhezhao{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
</style>
