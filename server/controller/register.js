/**
 * 注册手机，身份证，学生证
 */
'use strict';

const mysql = require('../config.mysql');

const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      'SELECT id FROM weixin.wx_users WHERE openId = ?',
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
        let sql = '';
        const sqlForm = [
          form.phone,
          form.idNo,
          form.studentNo,
          results[0] ? results[0].id : undefined,
        ];
        sql = 'UPDATE wx_users SET phone = ? , idNo = ? , studentNo = ?  where id = ?';

        mysql.query(sql, sqlForm, (doError, doResult, doFields) => {
          if (doError) {
            reject(doError);
          } else {
            resolve('更新成功');
          }
        });
      },
    );
  });
};

module.exports = _;
