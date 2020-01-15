export const formatJson = function (msg) {
  let rep = '~'
  let jsonStr = JSON.stringify(msg, null, rep)
  let str = ''
  for (let i = 0; i < jsonStr.length; i++) {
    let text2 = jsonStr.charAt(i)
    if (i > 1) {
      let text = jsonStr.charAt(i - 1)
      if (rep !== text && rep === text2) {
        str += ''
      }
    }
    str += text2
  }
  jsonStr = ''
  for (let i = 0; i < str.length; i++) {
    let text = str.charAt(i)
    if (rep === text) { jsonStr += '       ' } else {
      jsonStr += text
    }
  }
  return jsonStr
}
