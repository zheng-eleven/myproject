// 企业门户官网接口
var express = require('express');
const JobsController = require('../../controllers/web/JobsController');
var JobsRouter = express.Router();


// 接口
JobsRouter.get("/webapi/jobs/list",JobsController.getList)// 获取已发布的新闻数据
JobsRouter.get("/webapi/jobs/list/:id",JobsController.getList)// 获取对应id的新闻数据
JobsRouter.get("/webapi/jobs/toplist",JobsController.getTopList)// 获取最新新闻数据

module.exports = JobsRouter