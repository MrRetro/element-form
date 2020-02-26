<template>
  <div class="form-box">
    <div class="box">
      <div class="pad one">
        <textarea
          v-model="value"
          class="left"
          @input="onChange"/>
      </div>
      <div class="btns two">
        <el-button
          size="small"
          class="btn"
          type="danger"
          @click="clearAll"
        >清除</el-button>
        业务组件
        <el-button
          v-for="(item,key) in initForm"
          v-if="item.status"
          :key="key"
          size="small"
          class="btn"
          @click="addComp(key)"
        >{{ item.name }}</el-button>
      </div>
      <div class="btns">
        <el-button
          size="small"
          class="btn"
          type="danger"
          @click="clearAll"
        >清除</el-button>
        基础组件
        <el-button
          v-for="(item,key) in initForm"
          v-if="!item.status"
          :key="key"
          size="small"
          class="btn"
          @click="addComp(key)"
        >{{ item.name }}</el-button>
      </div>
    </div>
    <div class="box">
      <div class="pad">
        <FormCom
          :form="form"
          :is-delete="true"
          sub-name="提交校验表单"
          @onAttr="onAttr"
          @onDelete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormCom from '../../components/FormComponents'
import {formatJson} from '../../utils/common'
import configForm from '../../components/FormComponents/configForm'

export default {
  name: 'form',
  components: {
    FormCom
  },
  watch: {
    form: {
      handler (vl) {
        try {
          let str = 0
          if (typeof vl === 'string') {
            str = vl
          } else if (typeof vl === 'object') {
            str = JSON.stringify(vl)
          }
          let oldStr = 0
          if (typeof this.oldValue === 'string') {
            oldStr = this.oldValue
          } else if (typeof this.oldValue === 'object') {
            oldStr = JSON.stringify(this.oldValue)
          }
          if (str !== oldStr) {
            this.oldValue = typeof vl === 'object' ? JSON.parse(JSON.stringify(vl)) : vl
            this.value = formatJson(this.form)
          }
        } catch (e) {
          console.log(e)
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    window._vue_1 = this
    this.value = formatJson(this.form)
    this.oldValue = this.value
    this.initForm = JSON.parse(JSON.stringify(this.form))
  },
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 14; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      value: [],
      oldValue: [], // 历史数据
      initForm: [], // 初始化数据
      data: generateData(),
      form: configForm
    }
  },
  methods: {
    onChange (e) {
      try {
        this.form = JSON.parse(this.value)
      } catch (e) {
        console.log(e)
      }
    },
    onAttr (item) {
      console.log('retro-item==>', item)
      if (item) {
        switch (item.attr) {
          case 'title':
            this.form.map(v => {
              if (['1', '2'].includes(v.value)) {
                this.form.map(q => {
                  if (q.type === 'Radio') {
                    q.value = v.value
                  }
                })
              }
            })

            break
          default:
        }
      }
    },
    // 添加组件
    addComp (index) {
      try {
        let newForm = JSON.parse(this.value)
        newForm.push(this.initForm[index])
        this.value = formatJson(newForm)
        this.form = JSON.parse(this.value)
      } catch (e) {
        console.log(e)
      }
    },
    onDelete (index) {
      try {
        this.form.splice(index, 1)
        this.value = formatJson(this.form)
      } catch (e) {
        console.log(e)
      }
    },
    clearAll () {
      this.value = formatJson([])
      this.form = JSON.parse(this.value)
    }
  }
}
</script>

<style scoped>
  .box >>> .content-box, .box >>> .content-box2{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .form-box{
    display: flex;
    /*width: 100vw;*/
    height: 100vh;
  }
  .box{
    display: flex;
    width: 50%;
    height: 100vh;
    overflow-y: auto;
    position: relative;
  }
  .btns{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 20px;
    height: 100vh;
    overflow-y: auto;
  }
  .btns.two{
    right: 106px;
  }
  .btn{
    width: 100px;
    margin-left: 0px;
    margin-right: 10px;
  }
  .pad{
    padding: 20px;
    /*padding-right: 0px;*/
    padding-bottom: 0px;
    width: 100%;
    position: relative;
  }
  .pad >>> .form-input{
    width: 100%;
  }
  .pad.one{
    padding-top: 0px;
  }
  .left{
    width: calc(50vw - 20px);
    height: 100%;
    resize: none;
    outline: none;
    border:none;
    font-size: 14px;
  }
  .one:before{
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #eee;
  }
</style>
