import data from './configForm'

let newData = JSON.parse(JSON.stringify(data))
// newData.map(v => {
//   if (v.props && v.props.rules && v.props.rules.required) {
//     v.props.rules.required = false
//   }
// })
export default newData
