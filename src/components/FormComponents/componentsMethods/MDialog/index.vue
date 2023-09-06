<template>
  <div class='dialog-box'>
    <el-button type='primary' size='small' @click='open'>打开窗体</el-button>

    <div class='code' v-highlight>
<pre><code class='javascript hljs'>...
methods: {
  open () {
    this.ElementForm.$dialog.create({
      title: '个人信息',
      props: {
        width: '500px'
      },
      formData: [
        {
          'attr': 'name',
          'name': '姓名',
          'value': '',
          'type': 'Input',
          'props': {
            'size': 'small',
            'placeholder': '请输入',
            'rules': {
              'required': true,
              'message': '请输入'
            }
          }
        },
        {
          'attr': 'gender',
          'name': '性别',
          'value': '',
          'type': 'Radio',
          'props': {
            'size': 'small',
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
          ]
        }
      ],
      onChange (target, item, value, index) {
        console.log('onChange==>', target, item, value, index)
      },
      onCallback (target, obj) {
        console.log('onCallback==>', target, obj)
      }
    })
  }
}
...</code></pre>
    </div>
    <h3 class='h3'>如何使用</h3>
    <table>
      <thead>
      <tr><th>方法</th><th>说明</th><th>回调参数</th></tr>
      </thead>
      <tbody>
      <tr>
        <td>create</td>
        <td>创建 dialog</td>
        <td>
          创建 dialog 并初始化内置的 ElementForm<br />
          【title】弹窗标题<br />
          【props】弹窗属性<br />
          【formData】弹窗内表单配置<br />
          【formProps】弹窗内表单属性<br />
          【onChange】弹窗内表单变化 回调函数<br />
          【onCallback】弹窗确定 回调函数<br />
        </td>
      </tr>
      <tr><td>setFormData</td><td>设置弹窗的表单配置</td><td>参数【data】</td></tr>
      <tr><td>getFormData</td><td>获取弹窗的表单配置</td><td>参数【data】</td></tr>
      <tr><td>destroy</td><td>销毁弹窗</td><td>无参数</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ImMDialog',
  methods: {
    open () {
      this.ElementForm.$dialog.create({
        title: '个人信息',
        props: {
          width: '500px'
        },
        formData: [
          {
            'attr': 'name',
            'name': '姓名',
            'value': '',
            'type': 'Input',
            'props': {
              'size': 'small',
              'placeholder': '请输入',
              'rules': {
                'required': true,
                'message': '请输入'
              }
            }
          },
          {
            'attr': 'gender',
            'name': '性别',
            'value': '',
            'type': 'Radio',
            'props': {
              'size': 'small',
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
            ]
          }
        ],
        onChange (target, item, value, index) {
          console.log('onChange==>', target, item, value, index)
        },
        onCallback (target, obj) {
          console.log('onCallback==>', target, obj)
        }
      })
    }
  }
}
</script>

<style scoped>
.dialog-box{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.dialog-box .code{
  width: 80%;
  margin-top: 10px;
}
.dialog-box code{
  text-align: left;
}
.hljs{
  width: 100%;
  font-family: Menlo,Monaco,Consolas,Courier,monospace;
  font-size: 12px;
  padding: 12px 16px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}
h3{
  margin: 12px 0 20px;
  font-weight: 400;
  color: #1f2f3d;
}
.h3{
  margin: 55px 0 20px;
}
table{
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 45px;
  line-height: 1.5em;
}
th,td{
  border-bottom: 1px solid #dcdfe6;
  padding: 15px;
  max-width: 250px;
}
th{
  color: #909399;
}
td{
  color: #606266;
}
p{
  font-size: 12px;
  color: #5e6d99;
}
</style>
