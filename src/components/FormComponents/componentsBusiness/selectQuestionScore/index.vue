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
        <div class="box">
          <el-radio-group
            v-model="form.select"
            size="small"
            class="type-box"
            @change="handleSelect"
          >
            <el-radio-button
              v-for="(item,index) in selectOptions"
              :key="index"
              :label="item" />
          </el-radio-group>
          <!--<p class="type-name"><span>题目类型：</span>{{ $attrs.props.typeName }}</p>-->
          <!--<div>-->
          <!--<span>有效语音最低评测分数:</span>-->
          <!--<el-input-->
          <!--v-model="form.newValue.maxScore"-->
          <!--class="input score"-->
          <!--size="small"-->
          <!--placeholder="分数"-->
          <!--@blur="isClearVilidate"-->
          <!--@input="handleReg('maxScore')"-->
          <!--/>-->
          <!--</div>-->
          <table class="table">
            <thead>
              <tr><td>语音评测分数段</td><td/><td>对应分数</td><td/></tr>
            </thead>
            <tbody>
              <tr
                v-for="(value,key) in form.newValue.scoreMap[getSelectIndex]"
                :key="key">
                <td>
                  <el-input
                    :disabled="Object.keys(form.newValue.scoreMap[getSelectIndex]).length!==1"
                    v-model="value.min"
                    class="input"
                    size="small"
                    placeholder="最小评分"
                    @blur="isClearVilidate"
                    @input="handleReg('min','scoreMap',key)"
                  /> ≤ P < <el-input
                    :disabled="key < Object.keys(form.newValue.scoreMap[getSelectIndex]).length - 1"
                    v-model="value.max"
                    class="input"
                    size="small"
                    placeholder="最大评分"
                    @blur="isClearVilidate"
                    @input="handleReg('max','scoreMap',key)"
                  />
                </td>
                <td>=</td>
                <td><el-input
                  v-model="value.score"
                  class="input"
                  size="small"
                  placeholder="分数"
                  @blur="isClearVilidate"
                  @input="handleReg('score','scoreMap',key)"
                /></td>
                <td>
                  <el-button
                    v-if="key>0 && key === form.newValue.scoreMap[getSelectIndex].length -1"
                    type="danger"
                    icon="el-icon-delete"
                    size="small"
                    circle
                    @click="handleDelete(key)"/>
                </td>
              </tr>
            </tbody>
          </table>
          <el-button
            :class="{'more':Object.keys(form.newValue.scoreMap[getSelectIndex]).length>1}"
            icon="el-icon-plus"
            size="small"
            class="add"
            @click="handleAdd"
          >添加</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImSelectQuesion',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      form: {
        select: '', // 类型选择
        newValue: {
          scoreMap: {
            1: [{ min: '', max: '', score: '' }],
            2: [{ min: '', max: '', score: '' }],
            3: [{ min: '', max: '', score: '' }],
            4: [{ min: '', max: '', score: '' }],
            5: [{ min: '', max: '', score: '' }],
            6: [{ min: '', max: '', score: '' }]
          }
        }
      },
      oldForm: null
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    // 类型选择
    selectOptions () {
      return [
        'word',
        'sentence',
        'phrase',
        'paragraph',
        'wordList',
        'sentenceList'
      ]
    },
    // 获取选中类型的索引
    getSelectIndex () {
      return this.selectOptions.indexOf(this.form.select) + 1 || 1
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
  mounted () {
    const select = this.selectOptions[0]
    this.form.select = select
  },
  methods: {
    // 改变类型选中
    handleSelect () {
      const type = this.form.select
      const options = this.selectOptions
      switch (type) {
        case options[0]:
          // word
          break
        case options[1]:
          // sentence
          break
        case options[2]:
          // phrase
          break
        case options[3]:
          // paragraph
          break
        case options[4]:
          // wordList
          break
        case options[5]:
          // sentenceList
          break
      }
    },
    handleReg (key, parentKey, index) {
      switch (key) {
        case 'maxScore':
          this.form.newValue[key] = this.form.newValue[key].replace(/[^\d]/g, '')
          break
        default:
          this.form.newValue[parentKey][index][0][key] = this.form.newValue[parentKey][index][0][key].replace(/[^\d]/g, '')
      }
      this.isClearVilidate()
    },
    // 分数只能是数字
    inputChange (value) {
      value = value.replace(/[^\d]/g, '')
    },
    // 时时校验-校验通过清除提示
    isClearVilidate () {
      if (this.isVilidate() || !this.isRequired) {
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
      if (!this.form.newValue.maxScore) {
        state = false
      }
      const obj = this.form.newValue.scoreMap
      Object.values(obj).forEach((v) => {
        if (!v[0].min || !v[0].max || !v[0].score) {
          state = false
        }
      })
      return state
    },
    validate () {
      let state = false
      // 判断字段是否数据正确，如果正确的话校验通过，否则校验不过
      this.oldForm = JSON.parse(JSON.stringify(this.form))
      if (this.isVilidate() && this.isScoreOk()) {
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
    handleDelete (key) {
      this.form.newValue.scoreMap[this.getSelectIndex].splice(key, 1)
      this.form = JSON.parse(JSON.stringify(this.form))
    },
    // 添加
    handleAdd () {
      if (!this.isScoreOk()) {
        return false
      }
      // this.formClearValidate();
      const values = Object.values(this.form.newValue.scoreMap[this.getSelectIndex])
      this.form.newValue.scoreMap[this.getSelectIndex][values.length] = {
        min: values[(values.length - 1)].max || '',
        max: '',
        score: ''
      }
      this.form = JSON.parse(JSON.stringify(this.form))
    },
    // 判断评分业务逻辑是否正确
    isScoreOk () {
      const values = Object.values(this.form.newValue.scoreMap[this.getSelectIndex])
      if (!values[0].min || !values[values.length - 1].max || !values[values.length - 1].score) {
        this.$message.error('所有分数都不能为空')
        this.formValidate()
        return false
      }
      if (parseInt(values[values.length - 1].min, 10) >= parseInt(values[values.length - 1].max, 10)) {
        this.$message.error('最小评分必须小于最大评分')
        return false
      }
      return true
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
}
.type-box{
  min-width: 482px;
}
.type-name{
  margin: 0;
  color: #323232;
}
.table{
  min-width: 363px;
  text-align: center;
}
.add{
  display: flex;
  margin-left: 14px;
}
.add.more{
  margin-left: 3px;
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
.isRequired{
  padding-left: 10px;
}
  .input{
    width: 90px;
  }
  .input.score{
    margin-left: 6px;
  }
</style>
