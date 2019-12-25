// 获取组件名称
function getModuleName (name) {
  return name.substring(name.indexOf('/') + 1, name.indexOf('/index'))
}
// 首字母大写
function UpperFirst (name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
const context = require.context('../', true, /components[\w\W]*index.vue/)
const keys = context.keys()
const modules = Object.create({})
for (let i = 0; i < keys.length; i += 1) {
  modules[getModuleName(keys[i])] = keys[i]
}

const obj = Object.create({})
Object.keys(modules).map((v) => {
  if (v.indexOf('/') !== -1 && v.length > 1) {
    obj[`Im${UpperFirst(v.split('/')[1])}`] = () => import(`@/components/FormComponents${modules[v].slice(1)}`)
  }
})

export default {
  ...obj
}
