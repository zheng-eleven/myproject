// 职位表
const mongoose  = require("mongoose")
const Schema = mongoose.Schema
// Job模型===>Jobs集合

const JobType = {
    title:String,
    worker:String,//工作
    place:String,//工作地点
    count:Number ,//招聘人数
    introduction:String,// 简介
    date1:Date ,
}
// 创建数据库模型
const JobModel = mongoose.model("job",new Schema(JobType))

module.exports = JobModel