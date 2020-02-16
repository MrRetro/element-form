<template>
  <div class="containner">
    <h2>安装</h2>
    <h3>npm 安装</h3>
    <h5>推荐使用npm的方式安装</h5>
    <div class="code">
      <pre><code class="language-shell hljs">npm i element-form -S</code></pre>
    </div>
    <p class="h5">src/main.js</p>
    <div class="code" v-highlight>
      <pre>
        <code class="javascript hljs">import ElementForm from 'element-form'
import 'element-form/lib/element-form.css'

Vue.use(ElementForm)</code>
      </pre>
    </div>
    <h3>依赖</h3>
    <h5>因为是基于element-ui的二次封装，所有要先安装element-ui</h5>
    <div class="code">
      <pre><code class="language-shell hljs">npm i element-ui -S</code></pre>
    </div>
    <p class="h5">src/main.js</p>
    <div class="code" v-highlight>
      <pre>
        <code class="javascript hljs">import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)</code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImInstall'
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
