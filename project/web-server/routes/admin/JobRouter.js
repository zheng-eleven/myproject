// 职位接口
var express = require('express');
const JobController = require('../../controllers/admin/JobController');
var JobRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/jobuploads/' })



JobRouter.post("/adminapi/job/add",upload.single("file"),JobController.add)// 新增职位
JobRouter.get("/adminapi/job/list",JobController.getList)// 获取职位列表
JobRouter.get("/adminapi/job/list/:id",JobController.getList)// 获取对应的职位(编辑)
JobRouter.post("/adminapi/job/list",upload.single("file"),JobController.updateList)// 更新编辑的职位(编辑)
JobRouter.delete("/adminapi/job/list/:id",JobController.delList)// 删除产品






module.exports = JobRouter