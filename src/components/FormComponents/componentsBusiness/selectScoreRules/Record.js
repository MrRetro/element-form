export default [
  {
    attr: 'maxScore',
    name: '答题最多得分',
    value: '20',
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
        1: [{ min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }],
        2: [
          { min: 30, max: 40, score: 6 },
          { min: 40, max: 50, score: 8 },
          { min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }],
        3: [{ min: 30, max: 40, score: 6 },
          { min: 40, max: 50, score: 8 },
          { min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }],
        4: [{ min: 30, max: 40, score: 6 },
          { min: 40, max: 50, score: 8 },
          { min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }],
        5: [{ min: 30, max: 40, score: 6 },
          { min: 40, max: 50, score: 8 },
          { min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }],
        6: [{ min: 30, max: 40, score: 6 },
          { min: 40, max: 50, score: 8 },
          { min: 50, max: 60, score: 10 },
          { min: 60, max: 70, score: 12 },
          { min: 70, max: 80, score: 14 },
          { min: 80, max: 90, score: 16 },
          { min: 90, max: 100, score: 18 }]
      }
    },
    type: 'SelectQuestionScore',
    props: {},
    status: '1'
  }
]
