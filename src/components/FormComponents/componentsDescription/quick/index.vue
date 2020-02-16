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
    <p>
      直接在项目中调用 &lt;element-form :form="[]" /&gt;
    </p>
    <p>form属性内容就是组件的配置数据</p>
    <div class="code" v-highlight>
      <pre><code class="Javascript hljs">&lt;element-form :form="[{name: '开关', value: false, type: 'Switch', props: { placeholder: '选择', rules: { required: true, message: '请选择' } }}]" /&gt;</code></pre>
    </div>
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
