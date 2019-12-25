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
    attr: 'scoreMap',
    name: '',
    value: {
      scoreMap: {
        1: [{ min: 50, max: 60, score: 1 },
          { min: 60, max: 70, score: 2 },
          { min: 70, max: 80, score: 3 },
          { min: 80, max: 90, score: 4 },
          { min: 90, max: 100, score: 5 }],
        2: [
          { min: 30, max: 40, score: 3 },
          { min: 40, max: 50, score: 4 },
          { min: 50, max: 60, score: 5 },
          { min: 60, max: 70, score: 6 },
          { min: 70, max: 80, score: 7 },
          { min: 80, max: 90, score: 8 },
          { min: 90, max: 100, score: 9 }],
        3: [{ min: 30, max: 40, score: 3 },
          { min: 40, max: 50, score: 4 },
          { min: 50, max: 60, score: 5 },
          { min: 60, max: 70, score: 6 },
          { min: 70, max: 80, score: 7 },
          { min: 80, max: 90, score: 8 },
          { min: 90, max: 100, score: 9 }],
        4: [{ min: 30, max: 40, score: 3 },
          { min: 40, max: 50, score: 4 },
          { min: 50, max: 60, score: 5 },
          { min: 60, max: 70, score: 6 },
          { min: 70, max: 80, score: 7 },
          { min: 80, max: 90, score: 8 },
          { min: 90, max: 100, score: 9 }],
        5: [{ min: 30, max: 40, score: 3 },
          { min: 40, max: 50, score: 4 },
          { min: 50, max: 60, score: 5 },
          { min: 60, max: 70, score: 6 },
          { min: 70, max: 80, score: 7 },
          { min: 80, max: 90, score: 8 },
          { min: 90, max: 100, score: 9 }],
        6: [{ min: 30, max: 40, score: 3 },
          { min: 40, max: 50, score: 4 },
          { min: 50, max: 60, score: 5 },
          { min: 60, max: 70, score: 6 },
          { min: 70, max: 80, score: 7 },
          { min: 80, max: 90, score: 8 },
          { min: 90, max: 100, score: 9 }]
      }
    },
    type: 'SelectQuestionScore',
    props: {},
    status: '1'
  }
]
