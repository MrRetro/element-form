export default [
  {
    name: '安装',
    value: '',
    type: 'Install',
    props: {},
    status: '2'
  },
  {
    name: '快速上手',
    value: '',
    type: 'Quick',
    props: {},
    status: '2'
  },
  {
    name: '通用(右)',
    value: '',
    type: 'YourselfDiyRight',
    props: {},
    status: '1'
  },
  {
    name: '通用(中)',
    value: '',
    type: 'YourselfDiyCenter',
    props: {},
    status: '1'
  },
  {
    name: '通用(左)',
    value: '',
    type: 'YourselfDiyLeft',
    props: {},
    status: '1'
  },
  {
    name: '通用',
    value: '',
    type: 'YourselfDiy',
    props: {},
    status: '1'
  },
  {
    name: '选择组件',
    value: '',
    type: 'SelectComponent',
    props: {},
    status: '1'
  },
  {
    name: '自定义队列',
    value: {
      isShowBtn: true,
      value: [
        [
          {type: ''}
        ]
      ]
    },
    type: 'YourselfList',
    props: { rules: { required: true, message: '请填写', target: 'blur' }, typeName: 'word' },
    status: '1'
  },
  {
    name: '自定义队列+模式',
    value: {
      curMode: 0,
      isShowBtn: true,
      checkboxGroup: ['添加模式', '添加'],
      data: [
        {
          name: '模式0',
          value: [
            {
              value: [
                { type: '' }
              ]
            }
          ]
        }
      ]
    },
    type: 'YourselfListMode',
    props: { rules: { required: true, message: '请填写', target: 'blur' }, typeName: 'word' },
    status: '1'
  },
  {
    name: '资源上传(腾讯云)',
    value: '',
    type: 'UploadTencent',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '资源(单张)上传(腾讯云)',
    value: '',
    type: 'UploadSingleTencent',
    props: {
      accept: 'image/jpeg',
      rules: { required: true, message: '请选择', target: 'blur' }
    },
    status: '1'
  },
  {
    name: '资源上传(腾讯云-动画)',
    value: '',
    type: 'UploadZipTencent',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '资源(多张)上传(腾讯云)',
    value: '',
    type: 'UploadMulTencent',
    props: {
      accept: 'image/jpeg',
      rules: { required: true, message: '请选择', target: 'blur' }
    },
    status: '1'
  },
  {
    name: '导航管理',
    value: [],
    type: 'NavManage',
    props: { rules: { required: true, message: '请添加并填入', target: 'blur' } },
    status: '1'
  },
  {
    name: '评分规则模版',
    value: '',
    type: 'SelectScoreRules',
    props: { rules: { required: false, message: '请选择', target: 'blur' } },
    status: '1'
  }, {
    name: '游戏场景-表单',
    value: '',
    type: 'SelectGameForm',
    props: { rules: { required: true, message: '请选择', target: 'blur' }, typeName: 'word' },
    status: '1'
  }, {
    name: '题目内容-填空题',
    value: '',
    type: 'SelectContentLetter',
    props: { rules: { required: true, message: '请填写(答案不可重复)', target: 'blur' }, typeName: 'word' },
    status: '1'
  }, {
    name: '题目内容-选择题',
    value: '',
    type: 'SelectContentItem',
    props: { rules: { required: true, message: '请填写', target: 'blur' }, typeName: 'word' },
    status: '1'
  }, {
    name: '题目类型-评分',
    value: '',
    type: 'SelectQuestionScore',
    props: {},
    status: '1'
  }, {
    name: '选择语音',
    value: '',
    type: 'WordEditIcon',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  }, {
    name: '请选择word',
    value: '',
    type: 'SelectDoc',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  }, {
    name: '文本域带icon',
    value: '',
    type: 'TextareaIcon',
    props: { rules: { required: true, message: '请选择', target: 'blur' }, type: 'textarea', row: 2 },
    status: '1'
  }, {
    name: '按钮组',
    value: '',
    type: 'Btns',
    props: {
      rules: {
        required: false,
        message: '请选择',
        target: 'blur'
      },
      type: 'textarea',
      row: 2
    },
    status: '1',
    options: [
      {key: 'html', value: '网页录制'},
      {key: 'weixin', value: '微信录制'}
    ]
  }, {
    name: '树形组件(业务)',
    value: {
      curNode: {key: ''},
      options: [
        {key: 'html',
          value: '网页录制',
          children: [
            {key: '1',
              value: '页面1-1',
              children: [
                {key: '1-1', value: '页面1-1'}
              ]}
          ]},
        {key: 'weixin', value: '微信录制'}
      ]
    },
    type: 'PreTree',
    props: {
      rules: {
        required: false,
        message: '请选择',
        target: 'blur'
      }
    },
    status: '1'
  },
  {
    name: '请选择pdf',
    value: '',
    type: 'SelectPdf',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '请选择动画',
    value: '',
    type: 'SelectAnimation',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '请选择视频',
    value: '',
    type: 'SelectVideo',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  }, {
    name: '请选择音频',
    value: '',
    type: 'SelectAudio',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  }, {
    name: '请选择文件',
    value: '',
    type: 'SelectFile',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '请选择图片',
    value: '',
    type: 'SelectImage',
    props: { rules: { required: true, message: '请选择', target: 'blur' } },
    status: '1'
  },
  {
    name: '单选', value: '', type: 'Radio', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }]
  },
  {
    name: '单项选择', value: '', type: 'RadioGroup', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '选项一' }, { key: '2', value: '选项二' }, { key: '3', value: '选项三' }]
  },
  {
    name: '多选', value: [], type: 'CheckBox', props: { rules: { required: true, message: '请选择' }, border: true }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }]
  },
  {
    name: '请输入（文本）', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
  },
  {
    attr: 'content',
    name: '请输入（文本域）',
    value: '',
    type: 'Input',
    props: {
      placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' }, type: 'textarea', rows: '2'
    }
  },
  {
    name: '数量', value: '', type: 'InputNumber', props: { placeholder: '请输入', rules: { required: true } }
  },
  {
    name: '单项选题', value: '', type: 'Select', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }, options: [{ key: '1', value: '男' }, { key: '2', value: '女' }]
  },
  {
    name: '分组单项选题', value: '', type: 'SelectGroup', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }, options: [{ key: '1', value: '男', childrens: [{key: '1', value: '男1'}] }, { key: '2', value: '女' }]
  },
  {
    name: '级联选择器', value: [], type: 'Cascader', props: { placeholder: '请输入', rules: { required: true, message: '请输入' } }, options: [{ key: '1', value: '男', children: [{ key: '3', value: '未知' }] }, { key: '2', value: '女' }]
  },
  {
    name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '滑块', value: 30, type: 'Slider', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '时间选择器', value: '', type: 'TimePicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '日期选择器', value: '', type: 'DatePicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '图片选择', value: '', type: 'Upload', props: { action: 'https://jsonplaceholder.typicode.com/posts/', placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '评分', value: 0, type: 'Rate', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    name: '颜色选择器', value: '', type: 'ColorPicker', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
  },
  {
    attr: 'tree',
    name: '树形节点',
    value: '',
    type: 'Tree',
    props: {
      'show-checkbox': true,
      operation: true,
      placeholder: '请输入',
      rules: { required: true, message: '请输入', target: 'blur' },
      'default-expanded-keys': [201],
      'default-checked-keys': [20101],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 101,
          label: '二级 1-1',
          children: [{
            id: 10101,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 201,
          label: '二级 2-1',
          children: [{
            id: 20101,
            label: '三级 2-1-1'
          }]
        }, {
          id: 202,
          label: '二级 2-2',
          children: [{
            id: 20201,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 301,
          label: '二级 3-1',
          children: [{
            id: 30101,
            label: '三级 3-1-1'
          }]
        }, {
          id: 302,
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      props: {
        children: 'children',
        label: 'label'
      }
    }
  },
  {
    name: '穿梭框', value: [], type: 'Transfer', props: { placeholder: '选择', rules: { required: true, message: '请选择' }, data: [] }
  },
  { name: '确定', type: 'Button', props: { type: 'big' } },
  { name: '左排线', type: 'Line', position: 'left' },
  {
    name: '左排版',
    type: 'Layout',
    position: 'left',
    options: [
      {
        attr: 'title', name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入1或2试试', rules: { required: true, message: '请输入', target: 'blur' } }
      },
      {
        attr: 'content', name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
      }
    ]
  },
  { name: '居中线', type: 'Line', position: 'center' },
  {
    name: '居中',
    type: 'Layout',
    position: 'center',
    options: [
      {
        name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
      },
      {
        name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
      },
      {
        name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }
      }
    ]
  },
  { name: '各50%线', type: 'Line', position: 'left' },
  {
    name: '各50%',
    type: 'Layout',
    position: 'justify',
    options: [
      {
        attr: 'title', name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
      },
      {
        attr: 'content', name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
      }
    ]
  },
  { name: '右排线', type: 'Line', position: 'right' },
  {
    name: '右排版',
    type: 'Layout',
    position: 'right',
    options: [
      {
        name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
      },
      {
        name: '请输入', value: '', type: 'Input', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
      }
    ]
  },
  {
    name: '我是标题：', type: 'Title', props: { placeholder: '请输入', rules: { required: true, message: '请输入', target: 'blur' } }
  },
  {
    name: '$dialog', type: 'MDialog', props: { placeholder: '方法$dialog', rules: { required: true, message: '请输入', target: 'blur' } }, status: '3'
  },
  {
    name: '表格',
    type: 'Mtable',
    props: {
      isPage: true,
      tableHead: [
        {prop: 'name', label: '姓名'},
        {prop: 'gender', label: '性别'},
        {prop: 'age', label: '年龄'},
        {prop: 'aihao', label: '爱好'},
        {prop: 'zym', label: '座右铭'},
        {prop: 'remark', label: '备注'},
        {prop: 'operation', label: '操作'}
      ],
      tableData: [
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]},
        {name: '张三', gender: '男', age: 18, aihao: '羽毛球', zym: '金诚所至今称为开', remark: '无', operation: [{key: '1', value: '添加'}, {key: '2', value: '修改'}]}
      ],
      rules: { required: true, message: '请输入', target: 'blur' }
    }
  }
]
