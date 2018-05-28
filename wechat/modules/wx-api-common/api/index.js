/**
 * 封装微信 wx.request 方法，方便项目开发
 * get
 * post
 */

const apiFun = () => {};

//  url与data拼接
const urlParams = (url, params) => {
  let ret = decodeURIComponent(url);

  let retUrl = ret.match(/(.*)\?(.*)/);
  let urlParamsHave = '';

  if (retUrl && retUrl.length > 0) {
    ret = retUrl[1];
    urlParamsHave = retUrl[2] || '';
  }

  const arr = urlParamsHave.split('&');

  let data = {};
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      if (item) {
        const itemArr = item.split('=');
        data[itemArr[0]] = itemArr[1];
      }
    }
  }

  data = {
    ...data,
    ...params,
  };

  if (data && typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys && keys.length) {
      ret += '?';
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        ret += `${i === 0 ? '' : typeof data[key] === 'undefined' ? '' : '&'}${
          typeof data[key] === 'undefined'
            ? ''
            : `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        }`;
      }
    }
  }

  return ret;
};

//  根据baseUrl跟path，得出api 的真正地址
const getUrl = (baseUrl, path) =>
  /(http:\/\/|https:\/\/)/.test(path) ? path : `${baseUrl || ''}${path}`;

apiFun.prototype = {
  baseUrl: '',
  params: {},
  request: undefined,
  response: undefined,
  /**
   * 初始化api的基础参数
   * @type {*} Object
   * @param {*} baseUrl 基础路径，相当于接口地址
   * @param {*} params 基础参数，即每次调用都要传的参
   * @param {*} request 请求拦截器
   * @param {*} response 回调拦截器
   */
  setOption(data) {
    const _ = new apiFun();
    _.baseUrl = data.baseUrl || '';
    _.params = data.params || {};
    _.request = data.request || undefined;
    _.response = data.response || undefined;
    return _;
  },
  /**
   * get 方法
   * @param {*} path 接口地址
   * @param {*} data 参数
   */
  get(path, data) {
    //  请求前先拦截一下，看用户有没有自定义事件
    if (typeof this.request === 'function') {
      this.request(this);
    }

    const _ = (resolve, reject) => {
      wx.request({
        method: 'GET',
        url: urlParams(getUrl(this.baseUrl, path), {
          ...this.params,
          ...data,
        }),
        success: (res) => {
          //  回调前先拦截一下，看用户有没有自定义事件
          if (typeof this.response === 'function') {
            this.response(res);
          }

          return resolve(res);
        },
        fail: (res) => {
          //  回调前先拦截一下，看用户有没有自定义事件
          if (typeof this.response === 'function') {
            this.response(res);
          }

          return reject(res);
        },
      });
    };

    return new Promise(_);
  },
  /**
   * post 方法
   * @param {*} path 接口地址
   * @param {*} data 参数
   * @param {*} params 跟在url的参数
   * @example
   * api.post(path, data, {
   *  param,
   * });
   */
  post(path, data, params) {
    //  请求前先拦截一下，看用户有没有自定义事件
    if (typeof this.request === 'function') {
      this.request(this);
    }

    const paramsSend = params && typeof params === 'object' ? params.params : {};

    const _ = (resolve, reject) => {
      wx.request({
        method: 'POST',
        url: urlParams(getUrl(this.baseUrl, path), {
          ...this.params,
          ...paramsSend,
        }),
        data,
        success: (res) => {
          //  回调前先拦截一下，看用户有没有自定义事件
          if (typeof this.response === 'function') {
            this.response(res);
          }

          return resolve(res);
        },
        fail: (res) => {
          //  回调前先拦截一下，看用户有没有自定义事件
          if (typeof this.response === 'function') {
            this.response(res);
          }

          return reject(res);
        },
      });
    };
    return new Promise(_);
  },
};

const api = new apiFun();

module.exports = api;
