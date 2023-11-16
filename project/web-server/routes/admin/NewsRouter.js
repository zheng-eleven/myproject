// 新闻接口
var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

//涉及文件上传, 普通post不行, 需要加上 multer中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)// 上传新闻接口(带图片数据)
NewsRouter.get("/adminapi/news/list",NewsController.getList)// 新闻列表获取接口
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)// 获取对应id的新闻数据(编辑新闻)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)// 更新对应的新闻数据(编辑新闻)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)// 发布新闻接口
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)// 删除新闻接口


module.exports = NewsRouter