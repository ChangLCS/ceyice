/**
 * 主页文件的 api
 */

import api from '../../modules/wx-api-common/api/index';

const path = {
  sendMessage: 'https://way.jd.com/turing/turing',
};

const sendMessage = (form) =>
  api.get(path.sendMessage, {
    ...form,
  });

export default {
  sendMessage,
};
