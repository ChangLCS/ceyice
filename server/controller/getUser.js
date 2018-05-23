/**
 * 获取用户信息
 */
'use strict';

const mysql = require('../config.mysql');

const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      'SELECT * FROM weixin.wx_users WHERE openId = ?',
      [params.openId],
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        if (!results.length) {
          reject('当前用户没有授权');
          return;
        }
        resolve(results[0]);
      },
    );
  });
};

module.exports = _;
