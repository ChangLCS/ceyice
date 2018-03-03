/**
 * api 初始化文件
 */

import api from '../index';

const path = {
  sendMessage: '/turing/turing',
};

const sendMessage = (form) =>
  api.get(path.sendMessage, {
    ...form,
  });

export default {
  sendMessage,
};
