// 企业门户官网接口
var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var NewsRouter = express.Router();


// 接口
NewsRouter.get("/webapi/news/list",NewsController.getList)// 获取已发布的新闻数据
NewsRouter.get("/webapi/news/list/:id",NewsController.getList)// 获取对应id的新闻数据
NewsRouter.get("/webapi/news/toplist",NewsController.getTopList)// 获取最新新闻数据

module.exports = NewsRouter