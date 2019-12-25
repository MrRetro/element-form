export default [{
  attr: 'baseScore',
  name: '答题基础得分',
  value: '10',
  type: 'Input',
  props: {
    placeholder: '请输入',
    rules: {
      required: true,
      message: '请输入',
      target: 'blur'
    }
  }
},
{
  attr: 'maxScore',
  name: '答题最多得分',
  value: '10',
  type: 'Input',
  props: {
    placeholder: '请输入',
    rules: {
      required: true,
      message: '请输入',
      target: 'blur'
    }
  }
}

]
