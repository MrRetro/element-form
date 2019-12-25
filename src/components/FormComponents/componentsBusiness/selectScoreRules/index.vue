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
        <div class="item-box">
          <div class="temp-box">
            <p class="title">选择题</p>
            <FormCom :form="form.newValue.Select"/>
          </div>
          <div class="temp-box">
            <p class="title">抢答题</p>
            <FormCom :form="form.newValue.QiangDaTi"/>
          </div>
          <div class="temp-box">
            <p class="title">录音题目</p>
            <FormCom :form="form.newValue.Record"/>
          </div>
          <div class="temp-box">
            <p class="title">分组PK题目</p>
            <FormCom :form="form.newValue.TeamPK"/>
          </div>
          <div class="temp-box">
            <p class="title">点名题目</p>
            <FormCom :form="form.newValue.DianMing"/>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormCom from '../../index.vue'
import Select from './Select'
import QiangDaTi from './QiangDaTi'
import Record from './Record'
import TeamPK from './TeamPK'
import DianMing from './DianMing'

export default {
  name: 'ImSelectScoreRules',
  components: {
    FormCom
  },
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      form: {
        newValue: {
          Select,
          QiangDaTi,
          Record,
          TeamPK,
          DianMing
        }
      }
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
        if (vl) {
          this.form.newValue = vl
        } else {
          this.$emit('onInput', this.form.newValue)
        }
      },
      deep: true,
      immediate: true
    },
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
      },
      deep: true
    }
  },
  mounted () {
    if (!this.form.newValue.Select) {
      this.form.newValue.Select = Select
    }
  },
  methods: {
    validate () {
      let state = false
      this.$refs.form.validate((res) => {
        state = res
      })
      return state
    }
  }
}
</script>

<style scoped>
  .temp-box{
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    position: relative;
  }
  .temp-box .title{
    position: absolute;
    top: -20px;
    left: 20px;
    background-color: white;
    padding: 0px 10px;
    color: #606266;
    font-size: 12px;
    margin: 0;
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
.item-box{
  display: flex;
  flex-direction: column;
}
.item >>> .el-form-item__content{
  /*width: 60%;*/
}
.isRequired{
  padding-left: 10px;
}
</style>
