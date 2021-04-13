export default [
  {
    'attr': 'foo',
    'name': '单选',
    'value': '',
    'type': 'Select',
    'props': {
      'rules': {
        'required': true,
        'message': '请选择'
      },
      'border': true
    },
    'options': [
      {
        'key': '1',
        'value': '单选'
      },
      {
        'key': '2',
        'value': '多选'
      }
    ]
  },
  {
    'attr': 'foo1',
    'name': '单选',
    'value': '',
    'type': 'RadioGroup',
    'props': {
      'rules': {
        'required': true,
        'message': '请选择'
      },
      'border': true
    },
    'options': [
      {
        'key': '1',
        'value': '选项一'
      },
      {
        'key': '2',
        'value': '选项二'
      },
      {
        'key': '3',
        'value': '选项三'
      }
    ],
    'visibleOn': 'this.foo == 1',
    'readonlyOn': 'this.foo == 2'
  },
  {
    'attr': 'foo2',
    'name': '多选',
    'value': [],
    'type': 'CheckBox',
    'props': {
      'rules': {
        'required': true,
        'message': '请选择'
      },
      'border': true
    },
    'options': [
      {
        'key': '1',
        'value': '男'
      },
      {
        'key': '2',
        'value': '女'
      }
    ],
    'visibleOn': 'this.foo == 2'
  },
  {
    'name': '请输入（文本）',
    'value': '',
    'type': 'Input',
    'props': {
      'placeholder': '请输入',
      'rules': {
        'required': true,
        'message': '请输入',
        'target': 'blur'
      }
    },
    'readonlyOn': 'this.foo == 2'
  }
]
