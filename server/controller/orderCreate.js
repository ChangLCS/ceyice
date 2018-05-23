/**
 * 创建订单
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
          results[0].id,
          new Date(),
          form.phone,
          form.address,
          form.remarks,
          form.amount,
        ];
        sql =
          'INSERT INTO wx_orders(createId,createTime,phone,address,remarks,amount) VALUES(?,?,?,?,?,?)';

        const sqlstr = mysql.query(sql, sqlForm, (doError, doResult, doFields) => {
          if (doError) {
            reject(doError);
          } else {
            resolve({
              id: doResult.insertId,
            });
          }
        });
      },
    );
  });
};

module.exports = _;
