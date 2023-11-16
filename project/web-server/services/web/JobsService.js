const JobModel = require("../../models/JobModel")

const JobsService = {
    // 获取已发布的招聘岗位列表(根据时间倒序排序获取数据:新->旧)
    getList:async ({_id})=>{
        return _id?JobModel.find({_id}):JobModel.find().sort({date1:-1})
    },   
     // 获取最新的新闻数据(接收条数限制,时间倒序:新->旧)
     getTopList:async ({limit})=>{
        return JobModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    },   
}

module.exports = JobsService