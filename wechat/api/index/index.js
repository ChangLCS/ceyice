/**
 * 主页文件的 api
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
