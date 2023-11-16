// 产品表
const mongoose  = require("mongoose")
const Schema = mongoose.Schema
// product模型===>products集合

const ProductType = {
    title:String,
    introduction:String,// 简介
    detail:String,// 详情
    cover:String ,//封面
    editTime:Date 
}
// 创建数据库模型
const ProductModel = mongoose.model("product",new Schema(ProductType))

module.exports = ProductModel