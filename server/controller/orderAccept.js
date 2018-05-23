/**
 * 用户接订单，把订单状态改成待完成，并把接单人的信息带进去
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

        const userInfo = results[0];
        if (!userInfo.phone) {
          reject('请先填写注册信息');
          return;
        }

        const sql = 'UPDATE wx_orders SET acceptId = ?,acceptTime = ?,`status` = 1 WHERE id = ?;';

        const sqlForm = [userInfo.id, new Date(), form.id];

        const sqlstr = mysql.query(sql, sqlForm, (doError, doResult, doFields) => {
          if (doError) {
            reject(doError);
          } else {
            resolve('接单成功');
          }
        });
      },
    );
  });
};

module.exports = _;
