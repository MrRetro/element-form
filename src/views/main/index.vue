<template>
  <div class="form-box">
    <div class="open" @click="open(false)">展开</div>
    <div class="box left"
         :class="{'open':isOpen}"
    >
      <div class="menus">
        <p class="title">开发指南</p>
        <p
          v-for="(item,key) in initForm"
          v-if="['2'].includes(item.status)"
          :key="key"
          :class="{active:`${key}`===`${selected}`}"
          size="small"
          class="btn"
          @click="addComp(key, item.type)"
        >{{ item.name }}</p>
        <p class="title">基础组件</p>
        <p
          v-for="(item,key) in initForm"
          v-if="!['1','2'].includes(item.status)"
          :key="key"
          :class="{active:`${key}`===`${selected}`}"
          size="small"
          class="btn"
          @click="addComp(key, item.type)"
        >{{ item.name }}</p>
        <p class="title">业务组件</p>
        <p
          v-for="(item,key) in initForm"
          v-if="['1'].includes(item.status)"
          :key="key"
          :class="{active:`${key}`===`${selected}`}"
          size="small"
          class="btn"
          @click="addComp(key, item.type)"
        >{{ item.name }}</p>
      </div>
    </div>
    <div class="box right"
         @click="open(true)">
      <div class="pad">
        <FormCom
          :form="form"
          :sub-name="Object.keys(form[0]).includes('value') && !isDesc?'提交校验表单':''"
          @onAttr="onAttr"
          @onDelete="onDelete"
        />

        <div class="code" v-if="!isDesc">
          <el-input
            type="textarea"
            autosize
            resize="none"
            v-model="value"
            class="left"
            @input="onChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormCom from '../../components/FormComponents'
import {formatJson} from '../../utils/common'
import configForm from '../../components/FormComponents/configForm'

export default {
  name: 'index',
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
    this.initForm = JSON.parse(JSON.stringify(configForm))
    if (this.$route.params && this.$route.params.type) {
      this.addComp(this.$route.params.index, this.$route.params.type)
      return false
    }
    this.addComp()
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
      isOpen: false, // 是否打开菜单
      selected: -1, // 当前被选中的key
      value: [],
      oldValue: [], // 历史数据
      initForm: [], // 初始化数据
      data: generateData(),
      form: [],
      isDesc: false // 是否开发指南
    }
  },
  methods: {
    open (state) {
      if (state) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
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
    addComp (index = 0, type) {
      console.log('retro', type)
      let status = 2
      // 根据类型找到类型对应的配置
      const forms = JSON.parse(JSON.stringify(configForm))
      status = forms[index].status
      this.isDesc = `${status}` === '2'
      this.selected = index
      try {
        let newForm = []
        newForm.push(this.initForm[index])
        this.value = formatJson(newForm)
        this.form = JSON.parse(this.value)
      } catch (e) {
        console.log(e)
      }
      this.open(true)
      let path = '/'
      if (type) {
        path += `${index}/${type.toLowerCase()}`
      }
      this.$router.replace(path)
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
  .open{
    position: absolute;
    width: 50px;
    box-shadow: 0 0 1px 1px #eee;
    display: none;
    z-index: 10;
    background-color: white;
  }
  @media screen and (max-width: 700px) {
    html{
      position: fixed;
    }
    .open{
      display: inline-block;
    }
    .box.left {
      position: fixed;
      width: 200px !important;
      top: 0px;
      left: -200px;
      z-index: 999;
      background-color: white;
      transition: all .2s linear;
    }
    .box.left.open{
      left: 0px;
    }
    .box.right {
      width: 100vw !important;
      margin-left: 0px !important;
    }
  }
  ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #f0f0f0;
  }
  ::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
  }
  .box >>> .content-box, .box >>> .content-box2{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .form-box{
    display: flex;
    position: fixed;
  }
  .box{
    display: flex;
    width: 50%;
    height: 100vh;
    overflow-y: auto;
    position: relative;
  }
  .box.left{
    width: 240px;
  }
  .box.right{
    width: calc(100vw - 240px);
    position: absolute;
    margin-left: 240px;
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
    margin-left: 0px;
    margin-right: 10px;
    color: #444;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
    cursor: pointer;
    line-height: 30px;
    transition: color .2s linear;
  }
  .btn:hover,.btn.active{
    color: #409eff;
  }
  .pad{
    padding: 20px;
    padding-bottom: 0px;
    width: calc(100% - 40px);
    position: relative;
  }
  .pad >>> .form-input{
    width: 100%;
  }
  .pad.one{
    padding-top: 0px;
  }
  .code .left{
    width: 100%;
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
  .code{
    height: 500px;
  }

  .code >>> textarea{
    box-shadow: 0 2px 12px 0px rgba(0,0,0,.1);
  }

  .menus{
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }

  .title{
    width: 100%;
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }
</style>
