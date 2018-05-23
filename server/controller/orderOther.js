/**
 * 获取所有的未接订单，别人的
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

        const sql =
          ' SELECT' +
          ' u.nickName AS createName,' +
          ' u.avatarUrl AS createAvatarUrl,' +
          ' ua.nickName AS acceptName,' +
          ' ua.avatarUrl AS acceptAvatarUrl,' +
          ' ua.phone AS acceptPhone,' +
          ' o.*' +
          ' FROM' +
          ' wx_orders o' +
          ' LEFT JOIN wx_users u ON o.createId = u.id' +
          ' LEFT JOIN wx_users ua ON o.acceptId = ua.id' +
          ' WHERE o.`status` = 0 AND o.createId <> ?;';
        const sqlForm = [userInfo.id || 0];
        mysql.query(sql, sqlForm, (doError, doResult, doFields) => {
          if (doError) {
            reject(doError);
          } else {
            resolve(doResult);
          }
        });
      },
    );
  });
};

module.exports = _;
