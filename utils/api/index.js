import api from './api';

export default api.setOption({
  baseUrl: 'https://way.jd.com/', //  接口的基础地址配置
  params: {
    //  基础参数，即每次调用都要传的参
    appkey: '768719fda49c264028f98e20fa209221',
  },
});
