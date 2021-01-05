import UiLoading from './Loading.vue'
import Vue from 'vue'

let Loading = Vue.extend(UiLoading)
let loading = null

Vue.directive('loading', {
  bind(el, binding, vNode) {
    console.log(vNode)
    const loading = new Loading({
      el: document.createElement('div'),
      data: {}
    })
    el.appendChild(loading.$el)
    el.loading = loading
    Vue.nextTick(() => {
      loading.isShow = binding.value
    })
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.loading.isShow = binding.value
    }
  },
  unbind(el) {
    const element = el.loading.$el
    if (element.parentNode) {
      element.parentNode.removeChild(element)
    }
    el.loading.$destroy()
    el.loading = null
  }
})

Loading.prototype.close = function () {
  if (loading) {
    loading = null
  }
  this.isShow = false
  setTimeout(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  })
}

const Loadinginit = function (options = {}) {
  if (loading) {
    loading.close()
    return
  }
  let parent;
  if (options.parent && Object.prototype.toString.call(options.parent) == '[object String]') {
    parent = document.querySelector(options.parent)
  } else {
    parent = document.body
  }
  loading = new Loading({
    el: document.createElement('div'),
    data: options
  })
  console.log(loading)
  parent.appendChild(loading.$el)
  Vue.nextTick(() => {
    loading.isShow = true
  })
  return loading
}

export default Loadinginit