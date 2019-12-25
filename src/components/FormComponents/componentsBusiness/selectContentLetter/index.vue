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
        <div class="content-box">
          <span class="warn">【注意：选项不可重复】</span>
          <div class="box">
            <div
              v-for="(item,index) in form.newValue"
              :key="index"
              class="input-box">
              <span class="letter">{{ letter[index] }}</span>
              <el-input
                v-model="item.value"
                class="input"
                size="small"
                placeholder="请输入"
                @blur="isClearVilidate"
                @input="isClearVilidate"
              />
              <el-button
                v-if="index>0"
                type="danger"
                class="del"
                circle
                @click="handleDelete(index)"
              >x</el-button>
            </div>
          </div>
          <div>
            <el-button
              class="btn"
              size="small"
              @click="handleAdd"
          >新增选项</el-button></div>
          <span>正确答案</span>
          <div
            v-for="(item,index) in form.newValue"
            :key="index"
            class="select-box"
          >
            <span class="word">第{{ index+1 }}个空</span>
            <el-radio-group
              v-model="item.select"
              class="radio-box"
              @change="isClearVilidate"
            >
              <el-radio-button
                v-for="(key,value) in form.newValue"
                :key="'rd'+value"
                :label="letter[value]"
                size="mini"
              />
            </el-radio-group>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImSelectContentLetter',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      form: {
        newValue: [{
          value: '',
          select: ''
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
      // 判断用户选择答案中是否有重复答案
      if (this.isRepeat(this.form.newValue.map(v => v.select))) {
        state = false
      }
      // 选择答案不允许为空
      this.form.newValue.forEach((v) => { if (!v.select)state = false })
      return state
    },
    // 查看是否有重复
    isRepeat (arr) {
      const hash = {}
      let state = false
      arr.forEach((v, i) => {
        if (hash[v]) {
          state = true
        }
        hash[v] = true
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
        value: '',
        select: ''
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
.warn{
  color: red;
}
.content-box{
  flex-direction: column;
  min-height: initial;
}
.input-box{
  display: flex;
  flex-direction: row;
  position: relative;
}
.input-box .del{
  position: absolute;
  right: 3px;
  top: 0px;
  width: 6px;
  height: 6px;
  line-height: 0;
  padding: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.input-box .del >>> span{
  position: relative;
  top: -1px;
}
.input-box .letter{
  width: 10px;
}
.box{
  width: 460px;
  color: #606266;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
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
.input{
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.radio-box{
  margin-left: 10px;
}
.radio-box >>> .el-radio-button__inner{
  padding: 6px 10px;
}
.select-box{
  margin-bottom: 6px;
}
.word{
  color: #606266;
}
</style>
