<template>
  <div id="app">
    <a href="https://github.com/MrRetro/element-form" target="_blank" class="github-corner" aria-label="View source on Github"><svg viewBox="0 0 250 250" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
    <span class="zhezhao"></span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$nextTick(() => {
      let div = document.querySelector('.spinner')
      div && div.classList.remove('hide')
      div && div.classList.add('hide')

      console.log(`%c自我介绍\n
我叫 retro，是一名前端工程师\n
写这个网站存粹是为了提高工作效率\n
我的邮箱：caijiajia1@126.com\n
我的QQ：395336343，有好工作或入住广告再加哦！\n
最后，有什么宝贵意见或要吐槽的请到 gitee https://gitee.com/MrRetro/element-form 给我提 issues！
      `, 'color: #2699ff')
    })
  }
}
</script>

<style>
body{
  display: flex;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scoped>
  @media screen and (max-width: 900px){
    .zhezhao{display: none;}
    .github-corner{
      z-index: 1 !important;
    }
  }
  .zhezhao{
    position: fixed;
    width: 60px;
    height: 200px;
    top: -40px;
    right: 32px;
    text-decoration: none;
    transform: rotate(-45deg);
    z-index: 102;
  }
  .github-corner {
    border-bottom: 0;
    position: fixed;
    right: 0;
    text-decoration: none;
    top: 0;
    z-index: 100;
  }
  .github-corner svg {
    color: #fff;
    fill: #19CAAD;
    height: 80px;
    width: 80px;
    transition: all .3s linear;
  }
  .github-corner:hover .octo-arm {
    animation: a .56s ease-in-out
  }
  .github-corner:hover svg{
    opacity: .8;
  }
  @keyframes a {
    0%,to {
      transform: rotate(0)
    }

    20%,60% {
      transform: rotate(-25deg)
    }

    40%,80% {
      transform: rotate(10deg)
    }
  }
</style>
