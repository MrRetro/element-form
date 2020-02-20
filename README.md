# element-form
基于饿了么UI封装的表单

### 文档地址
[http://element-form.o-wu.com](http://element-form.o-wu.com)

### 安装
#### npm 安装
**推荐使用npm的方式安装**
```cmd
npm i element-form -S
```

src/main.js
```js
import ElementForm from 'element-form'
import 'element-form/lib/element-form.css'

Vue.use(ElementForm)
```



### 依赖
#### 因为是基于element-ui的二次封装，所有要先安装element-ui
```cmd
npm i element-ui -S
```

src/main.js
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```
