/**
 * @description sql 地址
 */

'use strict';

const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123666',
  port: '3306',
  database: 'weixin',
});
