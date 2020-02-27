<template>
  <div class="containner">
    <h2>快速上手</h2>
    <h3>完整引入</h3>
    <h5>在 main.js 中写入以下内容：</h5>
    <div class="code" v-highlight>
      <pre><code class="Javascript hljs">import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-form/lib/element-form.css'
import ElementForm from 'element-form'

Vue.use(ElementUI)
Vue.use(ElementForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
</code></pre>
    </div>
    <h5>开始使用</h5>
    <div class="code" v-highlight>
      <pre><code class="Javascript hljs">&lt;element-form :form="[{name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }}]" /&gt;</code></pre>
    </div>

    <h3 class="h3">属性</h3>
    <table>
      <thead>
        <tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr>
      </thead>
      <tbody>
        <tr><td>form</td><td>绑定值（内容有基础组件和业务组件组成）</td><td>array</td><td>—</td><td>[]</td></tr>
        <tr><td>subName</td><td>提交按钮名称（当按钮名称存在按钮即出现，<br />点击按钮会触发【validateForm】方法校验表单）</td><td>string</td><td>—</td><td>—</td></tr>
        <tr><td>isAutoBind</td><td>是否自动双向绑定数据</td><td>Boolean</td><td>—</td><td>true</td></tr>
      </tbody>
    </table>

    <h3 class="h3">事件</h3>
    <table>
      <thead>
      <tr><th>参数</th><th>说明</th><th>功能</th></tr>
      </thead>
      <tbody>
      <tr><td>onForm</td><td>绑定值变化</td><td>所有数据同步</td></tr>
      <tr><td>onAttr</td><td>绑定值变化</td><td>当前组件变更通知(用于组件与组件交互业务)</td></tr>
      <tr><td>onDelete</td><td>删除组件</td><td>删除当前组件通</td></tr>
      </tbody>
    </table>

    <h3 class="h3">方法</h3>
    <table>
      <thead>
        <tr><th>参数</th><th>说明</th><th>回调参数</th></tr>
      </thead>
      <tbody>
        <tr><td>getFormValue</td><td>绑定值变化</td><td>获取当前最新数据</td></tr>
        <tr><td>validateForm</td><td>表单校验</td><td>校验当前表单所有组件</td></tr>
        <tr>
          <td>onDataBind</td>
          <td>组件数据实时双向绑定</td>
          <td>
            配合属性【isAutoBind】为【false】情况下使用<br />
            【例如】当表单正在编辑时，组件内是不会实时双向绑定，当需要提交表单时调用此方法同步表单最新有效数据
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ImQuick'
}
</script>

<style scoped>
  .containner{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  h2{
    font-weight: 400;
    color: #1f2f3d;
    font-size: 28px;
    margin: 20px 0px;
  }
  h3{
    margin: 12px 0 20px;
    font-weight: 400;
    color: #1f2f3d;
  }
  .h3{
    margin: 55px 0 20px;
  }
  h5{
    font-weight: normal;
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
    margin: 14px 0px;
  }
  .h5{
    font-size: 12px;
    color: #5e6d82;
    position: relative;
    top: 20px;
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
  .code{
    text-align: left;
    width: 100%;
  }
  .hljs{
    font-family: Menlo,Monaco,Consolas,Courier,monospace;
    font-size: 12px;
    padding: 12px 16px;
    background-color: #fafafa;
    border: 1px solid #eaeefb;
    border-radius: 4px;
  }
  .hljs, .hljs-subst {
    color: #000;
  }
</style>
