const baseUrl = 'https://way.jd.com/';

const get = (url, data) => {
  return wx.request({
    url: `${baseUrl}${url}`,
    data,
    success(res) {
      get.then(res);
    },
  });
};

get.prototype.then = (fun) => {
  if (fun && typeof fun === 'function') {
    fun();
  }
};

module.exports = {
  get,
};
