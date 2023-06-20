/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  MAPLOAD: any; // 根据实际情况，将 "MAPLOAD" 的类型设置为正确的类型
  getType: function
  deepCopy: function
  getUrlParam: function
  debounce: function
}

declare module 'nprogress' {
  interface np {
    start: any;
    done: any;
  }
  const NProgress: np
  export default NProgress
}

declare module 'mockjs' {
  const Mock: {
    setup: any;
    mock: any;
  }
  export default Mock
}