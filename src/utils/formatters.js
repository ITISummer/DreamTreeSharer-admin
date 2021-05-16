import moment from 'moment'

/* 布尔值格式化：cellValue为后台返回的值 */
export const formatBoolean = function(row, column, cellValue) {
  let ret = ''  //你想在页面展示的值
  if (cellValue) {
    ret = '是'  //根据自己的需求设定
  } else {
    ret = '否'
  }
  return ret
}

/* format time */
export const formatTime = function(row, column, value) {
  return moment(value).format('yyyy-MM-DD HH:mm:ss')  //评论时间
}

// format table row or col
export const formatTableRow = function() {
  return 'text-align:center'
}
export const formatTableHeader = function() {
  return 'text-align:center'
}
