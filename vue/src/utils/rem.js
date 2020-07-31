/*
utils/rem.js
使用rem布局

注意： 页面最大宽度限制取全局配置window.pageWidth （px）
*/
((function (document, window) {
  const docEl = document.documentElement
  const pageWidth = window.config.pageWidth
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
      const clientWidth = docEl.clientWidth
      if (pageWidth > 0) {
          docEl.style.fontSize = (clientWidth && clientWidth < pageWidth ? clientWidth : pageWidth) / 7.5 + 'px'
      } else {
          docEl.style.fontSize = clientWidth / 7.5 + 'px'
      }
  }
  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
  // 3秒后检查如果html fontSize为0，手动触发计算fontSize。
  setTimeout(() => {
      if (parseInt(document.defaultView.getComputedStyle(docEl).fontSize) === 0) recalc()
  }, 3000)
})(document, window))
