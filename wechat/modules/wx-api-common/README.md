### 封装了 wx.request 的 方法

* get
* post

### 例子

* 全局配置文件 index.js 的写法，之后每个文件引用该文件即可

```
import api from '../modules/wx-api-common/api/index.js';

export default api.setOption({
  baseUrl: '', //  接口的基础地址配置
  params: {
    //  基础参数，即每次调用都要传的参
    access_token: 'access_token',
  },
  request: (a) => { //  请求拦截器
  },
  response: (res) => {  //  回调拦截器
  },
});
```

# npm i wx-api-common

# 小程序不支持 'node_modules'，所以在安装后把文件夹名称改成 'modules'，这是个很坑的地方
