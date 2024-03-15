import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import App from './App.vue'
import router from './router'

let instance = null
const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      render(props.container)
      //  可以通过props读取主应用的参数：msg
      // 监听主应用传值
      props.onGlobalStateChange((res) => {
        console.log(res.count)
      })
    },
    bootstrap() {},
    unmount() {
      instance.unmount()
      instance._instance = null
      instance = null
    },
    update() {}
  })
}

const render = (container) => {
  if (instance) return
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  // 注意：这边需要避免 id（app） 重复导致子应用挂载失败
  const appDom = container ? container.querySelector('#app') : '#app'
  instance = createApp(App)
  instance.use(createPinia())
  instance.use(router)
  instance.mount(appDom)
}

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()
