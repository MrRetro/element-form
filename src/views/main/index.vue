<template>
  <div class="form-box">
    <div class="box">
      <div class="pad one">
        <textarea class="left" v-model="value" @input="onChange"></textarea>
      </div>
      <div class="btns">
        <el-button
          size="small"
          class="btn"
          type="danger"
          @click="clearAll"
        >清除</el-button>
        <el-button
          v-for="(item,key) in initForm"
          :key="key"
          size="small"
          class="btn"
          @click="addComp(key)"
        >{{item.name}}</el-button>
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

export default {
  name: 'index',
  components: {
    FormCom
  },
  watch: {
    form: {
      handler (vl) {
        try {
          if (JSON.stringify(JSON.parse(this.value)) !== JSON.stringify(JSON.parse(this.oldValue))) {
            this.value = formatJson(this.form)
            this.oldValue = this.value
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
      form: [
        // { name: '确定', type: 'Button', props: { type: 'big' } },
        { attr: 'title', name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入1或2试试', rules: { required: true, message: '请输入', target: 'blur' } } },
        { name: '单选', value: '', type: 'Radio', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }] },
        { name: '单项选择', value: '', type: 'RadioGroup', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '选项一' }, { key: '2', value: '选项二' }, { key: '3', value: '选项三' }] },
        { name: '多选', value: [], type: 'CheckBox', props: { rules: { required: true, message: '请选择' }, border: true }, options: ['男', '女'] },
        { name: '数量', value: '', type: 'InputNumber', props: { placeholder: '请输入', rules: { required: true } } },
        { name: '单项选题', value: '', type: 'Select', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }] },
        { name: '级联选择器', value: [], type: 'Cascader', props: { placeholder: '请输入', rules: { required: true, message: '请输入' } }, options: [{ key: '1', value: '男', children: [{ key: '3', value: '未知' }] }, { key: '2', value: '女' }] },
        { name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '滑块', value: 30, type: 'Slider', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '时间选择器', value: '', type: 'TimePicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '日期选择器', value: '', type: 'DatePicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '图片选择', value: '', type: 'Upload', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '评分', value: 0, type: 'Rate', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
        { name: '颜色选择器', value: '', type: 'ColorPicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } }
        // { name: '穿梭框', value: [], type: 'Transfer', props: { placeholder: '选择', rules: { required: true, message: '请选择' }, data: generateData() } }
      ]
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
.form-box{
  display: flex;
  width: 100vw;
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
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.btn{
  width: 100px;
  margin-left: 0px;
  margin-right: 10px;
}
.pad{
  padding: 20px;
  padding-right: 0px;
  padding-bottom: 0px;
  width: 100%;
  position: relative;
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
