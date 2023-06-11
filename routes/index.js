var express = require('express');
var router = express.Router();

const formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//显示网页的表单
router.get('/portrait', (req, res) => {
  res.render('portrait')
});

//处理文件的上传
router.post('/portrait', (req, res) =>{
  //创建from对象
  const form = formidable({ 
    multiples: true ,
    //设置文件上传的保存目录
    uploadDir: __dirname + '/../public/images',
    //保持文件后缀
    keepExtensions:true
  });
  //解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    //服务器保存文件图片的访问 URL
    let url = '/images/' + files.portrait.newFilename;//将来存放在数据库中

    // console.log(fields)
    // console.log(files)

    res.send(url).end('ok')
  });
  
});

module.exports = router;
