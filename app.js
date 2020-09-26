var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');

// var server = http.createServer();

// server.on('request', function (request, response) {
//   console.log('收到请求！');
// })

// server.listen(3003, function () {
//   console.log('使用172.0.0.1:3003打开');
// })
var comments = [
  {
    name: 'zs',
    message: '今天周六！',
    dateTime: '2020-9-25'
  },
  {
    name: 'zs2',
    message: '今天周六！',
    dateTime: '2020-9-25'
  },
]

http.createServer(function (req, res) {
  // var url = req.url;
  var parseObj = url.parse(req.url, true);
  var pathName = parseObj.pathname;
  if (pathName === '/') {
    fs.readFile('./views/index.html', function (err, data) {
      if (err) {
        return res.end('404');
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr);

    })
  }
  else if (pathName.indexOf('/public/') == 0) {
    fs.readFile('.' + pathName, function (err, data) {
      if (err) {
        return res.end('404');
      }
      res.end(data);

    })
  }
  // 评论输入
  else if (pathName == '/post.html') {
    fs.readFile('./views/post.html', function (err, data) {
      if (err) {
        return res.end('404');
      }
      res.end(data);
    })
  }
  // 发表
  else if (pathName == '/pinglun') {
    // 
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // res.end(JSON.stringify(parseObj.query));
    var comment = parseObj.query;
    comment.dateTime = new Date().toLocaleString('chinese', { hour12: false });
    comments.unshift(comment);

    // 重定向
    res.statusCode = '302';
    res.setHeader('location', '/');
    res.end();
  }
  else {
    fs.readFile('./views/404.html', function (err, data) {
      // res.setHeader('Content-Type', 'text/html;charset=utf-8');
      res.end(data);
    })
  }
})
  .listen(3003, function () {
    console.log('服务器已启动！');
  })