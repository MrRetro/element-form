export default [
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
  },
  {
    attr: 'exScore',
    name: '额外加分分值',
    value: '1',
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
    attr: 'maxExScore',
    name: '最对额外得分',
    value: '5',
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
    attr: 'scoreMap',
    name: '',
    value: {
      scoreMap: {
        1: [{ min: 40, max: 100, score: 2 }],
        2: [{ min: 30, max: 100, score: 2 }],
        3: [{ min: 30, max: 100, score: 2 }],
        4: [{ min: 30, max: 100, score: 2 }],
        5: [{ min: 30, max: 100, score: 2 }],
        6: [{ min: 30, max: 100, score: 2 }]
      }
    },
    type: 'SelectQuestionScore',
    props: {},
    status: '1'
  }
]
