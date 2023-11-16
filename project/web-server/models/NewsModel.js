// 新闻表
const mongoose  = require("mongoose")
const Schema = mongoose.Schema
// news模型===>news集合

const NewsType = {
    title:String,
    content:String,
    category:Number, //类别,1,2,3
    cover:String ,//封面(保存的是路径)
    isPublish:Number, //未发布, 已发布
    editTime:Date 
}
// 创建数据库模型
const NewsModel = mongoose.model("news",new Schema(NewsType))

module.exports = NewsModel