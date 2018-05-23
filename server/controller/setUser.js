/**
 * 初始化用户的信息
 */
'use strict';

const http = require('https');
const mysql = require('../config.mysql');
const weixinConfig = require('../weixin/config');

const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    const path = `https://api.weixin.qq.com/sns/jscode2session?appid=${weixinConfig.appId}&secret=${
      weixinConfig.appSecret
    }&js_code=${form.code}&grant_type=authorization_code`;

    http.get(path, (res) => {
      let resData = '';
      res.on('data', (body) => {
        resData += body;
      });
      res.on('end', () => {
        resData = JSON.parse(resData);
        form = Object.assign(form, {
          openId: resData.openid,
        });

        mysql.query(
          'SELECT * FROM weixin.wx_users WHERE openId = ?',
          [form.openId],
          (error, results, fields) => {
            if (error) {
              reject(error);
              return;
            }
            let sql = '';
            const sqlForm = [
              form.avatarUrl,
              form.city,
              form.country,
              form.province,
              form.gender,
              form.nickName,
              form.openId,
              results[0] ? results[0].id : undefined,
            ];
            if (results.length) {
              sql =
                'UPDATE wx_users SET avatarUrl = ? , city = ? , country = ? , province = ?, gender = ? , nickName = ? , openId = ? where id = ?';
            } else {
              sql =
                'INSERT INTO wx_users SET avatarUrl = ? , city = ? , country = ? , province = ?, gender = ? , nickName = ? , openId = ?';
            }

            const sqlstr = mysql.query(sql, sqlForm, (doError, doResult, doFields) => {
              if (results.length) {
                form = Object.assign({}, results[0], form, {
                  id: results[0] ? results[0].id : undefined,
                });
              } else {
                form = Object.assign(form, {
                  id: doResult.insertId,
                });
              }

              if (doError) {
                reject(doError);
              } else {
                resolve(form);
              }
            });
          },
        );
      });
    });
  });
};

module.exports = _;
