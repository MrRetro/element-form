<template>
  <div>
    <div class="content-box">
      <div
        v-for="(item,index) in form.newValue"
        :key="index"
        class="box">
        <div class="content">
          <div class="sel-box">
            <div
              class="input-box">
              <span class="key">key</span>
              <el-input
                v-model="item.key"
                placeholder="key值"
                class="input"
                size="small"
                @blur="isClearVilidate"
                @input="isClearVilidate"
              />
            </div>
            <div class="input-box">
              <span class="key">value</span>
              <el-input
                v-model="item.value"
                placeholder="value值"
                class="input"
                size="small"
                @blur="isClearVilidate"
                @input="isClearVilidate"
              />
            </div>
            <el-button
              type="danger"
              size="small"
              class="del"
              @click="handleDelete(index)"
            >删除</el-button>
          </div>
        </div>
      </div>
      <el-button
        v-if="typeof form.newValue[0] !== 'string'"
        class="btn"
        size="small"
        @click="handleAdd"
      >添加选项</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImSelectContentEdit',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      form: {
        newValue: [{
          key: '',
          value: ''
        }]
      },
      oldForm: null
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
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
      },
      deep: true
    }
  },
  methods: {
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
      // 所有分数字段必须填写
      let state = true
      this.form.newValue.forEach((v) => {
        if (!v.value) state = false
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
      this.form.newValue.splice(index, 1)
    },
    // 添加
    handleAdd () {
      this.formClearValidate()
      this.form.newValue.push({
        key: '',
        value: ''
      })
      this.form = JSON.parse(JSON.stringify(this.form))
    },
    // 正确答案选中
    handleChange (index) {
      this.form.newValue.forEach((v, i) => {
        if (index !== i) v.boolean = false
      })
    },
    // 校验表单
    formValidate () {
      this.$refs.form && this.$refs.form.validate()
    },
    // 清除表单
    formClearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>
.box{
  color: #606266;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.content-box{
  flex-direction: column;
  min-height: initial;
}
.content{
  /*margin-left: 6px;*/
  /*margin-bottom: 20px;*/
}
.content-box .box:last-of-type .content{
  margin-bottom: 0px;
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
.item >>> .app-qiniu{
  width: 180px;
  height: 40px;
}
.input{
  width: 80px;
}
.input >>> input{
  padding: 0;
}
.sel-box{
  margin: 0px;
  display: flex;
  flex-direction: row;
}
.input-box{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.input-box .key{
  margin-left: 6px;
  margin-right: 6px;
}
  .btn{
    margin-left: 34px;
    margin-top: 10px;
    width: 80px;
  }
  .del{
    height: 30px;
    margin-left: 12px;
    margin-top: 4px;
  }
</style>
