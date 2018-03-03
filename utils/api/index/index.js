import api from '../index';

console.log('apiapi', api);
const path = {
  sendMessage: '/turing/turing',
};

const sendMessage = (form) =>
  api.get(path.sendMessage, {
    ...form,
  });

console.log('typeof sendMessage', typeof sendMessage);

export default {
  sendMessage,
};
