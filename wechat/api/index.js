/**
 * api 初始化文件
 */

// import api from './api';
// import api from '../node_modules/wx-api-common/api/index.js';
import api from '../modules/wx-api-common/api/index.js';

// const api = require('../node_modules/wx-api-common/api/index.js');

export default api.setOption({
  baseUrl: 'https://way.jd.com/', //  接口的基础地址配置
  params: {
    //  基础参数，即每次调用都要传的参
    appkey: '768719fda49c264028f98e20fa209221',
  },
  request: (a) => {
    a.params.name = 'test';
  },
  response: (res) => {
    console.log('response', res);
    res.aaaaa = '拦截测试';
  },
});
