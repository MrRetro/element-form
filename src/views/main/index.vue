<template>
  <div class="form-box">
    <div class="box">
      <div class="pad one">
        <textarea class="left" v-model="value" @input="onChange"></textarea>
      </div>
    </div>
    <div class="box">
      <div class="pad">
        <FormCom :form="form"/>
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
          this.value = formatJson(this.form)
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
      data: generateData(),
      form: [
        // { name: '确定', type: 'Button', props: { type: 'big' } },
        { name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } } },
        { name: '单选', value: '', type: 'Radio', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }] },
        { name: '多选', value: [], type: 'CheckBox', props: { rules: { required: true, message: '请选择' }, border: true }, options: ['男', '女'] },
        { name: '数量', value: '', type: 'InputNumber', props: { placeholder: '请输入', rules: { required: true } } },
        { name: '单项选题', value: '', type: 'Select', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }] },
        { name: '级联选择器', value: [], type: 'Cascader', props: { placeholder: '请输入', rules: { required: true, message: '请输入' } }, options: [{ key: '1', value: '男', children: [{ key: '3', value: '未知' }] }, { key: '2', value: '女' }] },
        { name: '开关', value: '', type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } } },
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
    onChange () {
      try {
        this.form = JSON.parse(this.value)
      } catch (e) {
        console.log(e)
      }
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
