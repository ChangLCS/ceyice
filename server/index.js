/**
 * @description 随便写的，没用express，顺便当成学习
 * @version 1.0.0
 * @since 真正搭项目还是得用框架啊，不然一手一手来太麻烦了，当几个简单的接口进行访问就得做很多个判断条件来让接口调成功，还有参数的接收
 */

'use strict';

const http = require('http'); //  创建http服务
const url = require('url'); //  分析请求url
const config = require('./config');
const apiPath = require('./apiPath');

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const form = JSON.parse(body ? body : '{}');

    const reg = new RegExp(/(\/?)(\/.*)/);
    const path = `./controller/${apiPath[urlInfo.pathname.replace(reg, '$2')]}`;

    const apiFun = require(path);

    res.writeHead(
      200,
      Object.assign({}, config.responseHeader, {
        'Access-Control-Allow-Origin': req.headers.host,
      }),
    );

    apiFun(urlInfo.query, form)
      .then((result) => {
        res.end(
          JSON.stringify(
            Object.assign({}, config.responseSuccess, {
              result,
            }),
          ),
        );
      })
      .catch((result) => {
        res.end(
          JSON.stringify(
            Object.assign({}, config.responseError, {
              result,
            }),
          ),
        );
      });
  });
});

server.listen(9000);

console.log('-----------------------------');
console.log('9000 --------------  server running');
