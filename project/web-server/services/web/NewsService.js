const NewsModel = require("../../models/NewsModel")

const NewsService = {
    // 获取已发布的新闻数据列表(根据时间倒序排序获取数据:新->旧)
    getList:async ({_id})=>{
        return _id?NewsModel.find({_id,isPublish:1}):NewsModel.find({isPublish:1}).sort({editTime:-1})
    },    
    // 获取最新的新闻数据(接收条数限制,时间倒序:新->旧)
    getTopList:async ({limit})=>{
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    },  
}

module.exports = NewsService