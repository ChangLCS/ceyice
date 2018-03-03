const path = '/turing/turing';

// const get = (url, data) => {
//   return wx.request({
//     url: `${baseUrl}${url}`,
//     data,
//     success(res) {
//       get.then(res);
//     },
//   });
// };

// get.prototype.then = (fun) => {
//   if (fun && typeof fun === 'function') {
//     fun();
//   }
// };

// module.exports = {
//   get,
// };

/**
 * 最终格式是
 * api.get(data).then(callback);
 */

const apiFun = () => {};

let resback = {};

apiFun.prototype = {
  baseUrl: '',
  res: {},
  setOption(data) {
    console.log('setoptions', data);
    this.baseUrl = data.baseUrl || '';
    return this;
  },
  //  get 方法
  get(path, data) {
    const that = this;
    console.log('that.baseUrl', `${path}`);
    wx.request({
      url: `${that.baseUrl || ''}${path}`,
      data,
      success(res) {
        console.log('that.success', that.success);
        if (typeof that.success === 'function') {
          that.success(res);
        }
      },
      fail(res) {
        console.log('that.fail', that.fail);
        if (typeof that.fail === 'function') {
          that.fail(res);
        }
      },
    });
    return this;
  },
  //  then  回调成功事件
  then(callback) {
    if (typeof callback === 'function') {
      this.success = callback;
    }
    return this;
  },
  //  catch 回调失败事件
  catch(callback) {
    if (typeof callback === 'function') {
      this.fail = callback;
    }
    return this;
  },
  //  success 的回调
  success(res) {
    return this;
  },
  //  fail  的回调
  fail(res) {
    return this;
  },
};

// apiFun.prototype.get = (path, data) => {};

// apiFun.prototype.then = (callback) => {
//   // typeof
// };

const api = new apiFun();

module.exports = api;
