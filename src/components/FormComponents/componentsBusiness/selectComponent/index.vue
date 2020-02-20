<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="''"
        :rules="$attrs.props.rules"
        :class="{isRequired: !isRequired}"
        prop="newValue"
        class="item"
      >
        <div class="content-box2">
            <el-select
              v-if="!form.newValue.type"
              :filterable="true"
              v-model="form.newValue.type"
              size="small"
              placeholder="请选择组件"
              class="select-box"
              @change="handleChange(form.newValue.type)">
              <el-option
                v-for="(item,index) in newOptions"
                :key="'ops'+item.type+Math.random()"
                :label="item.name"
                :value="index"/>
            </el-select>
            <div class="comp-box" v-else>
              <FormComp
                :key="'form'+Math.random()"
                :form="[form.newValue]"
              />
              <el-button
                type="danger"
                class="del"
                size="small"
                @click="handleDelete()"
              >删除</el-button>
            </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import configForm from '../../configForm'
import FormComp from '../../index.vue'

export default {
  name: 'ImSelectComponents',
  components: {
    FormComp
  },
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      options: configForm,
      form: {
        newValue: {
          type: ''
        }
      },
      oldForm: null
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
        list = list.filter(v => !['SelectComponent', 'YourselfDiy', 'YourselfDiyLeft', 'YourselfDiyCenter', 'YourselfDiyRight', 'Layout', 'Line', 'Button', 'Transfer', 'Upload'].includes(v.type) && `${v.status}` !== '2')
      } catch (e) {
        console.log('err==>', e)
      }
      return list
    },
    // 获取实际可以输出的配置
    getNewConfig () {
      let arr = []
      // try {
      //   arr = JSON.parse(JSON.stringify(this.form.newValue.layout)).filter(v => v.config).map(v => v.config)
      // } catch (e) {
      //   console.log('获取失败==>', e)
      // }
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
        let newValue = vl
        if (!isNaN(newValue.type)) {
          vl = this.options[newValue.type]
        }
        this.$emit('onInput', vl)
        this.isClearVilidate()
      },
      deep: true
    }
  },
  methods: {
    // 确定
    submit () {
      let count = 0
      // 更新数据
      this.form.newValue.layout.map((v) => {
        if (v.config) {
          v.config = [this.preForm[count]]
          count += 1
        }
      })
      this.close()
    },
    // 选择获取组件
    handleChange (type) {
      // 获取选中的表单项
      const obj = this.newOptions[type]
      console.log(777, type)
      console.log(7772, obj)
      this.form.newValue = JSON.parse(JSON.stringify(obj))
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
      this.form.newValue = {type: ''}
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
