// 获取组件名称
function getModuleName (name) {
  return name.substring(name.indexOf('/') + 1, name.indexOf('/index'))
}
// 首字母大写
function UpperFirst (name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
const context = require.context('./', true, /[\w\W]*index.vue/)
const keys = context.keys()
const modules = Object.create({})
for (let i = 0; i < keys.length; i += 1) {
  modules[getModuleName(keys[i])] = keys[i]
}

const obj = Object.create({})
Object.keys(modules).map(v => {
  obj[`Im${UpperFirst(v)}`] = () => import(`${modules[v]}`)
})

export default obj
