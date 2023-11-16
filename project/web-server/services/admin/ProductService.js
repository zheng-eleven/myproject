// 操作数据库
const ProductModel = require("../../models/ProductModel")

const ProductService = {
    // 新增产品
    add:async ({title,introduction,detail,cover,editTime})=>{
        return ProductModel.create({
            title,introduction,detail,cover,editTime
        })
    },

    // 编辑产品
    updateList:async({title,introduction,detail,_id,cover,editTime})=>{
        if(cover){
            return ProductModel.updateOne({_id},{
                title,introduction,detail,cover,editTime
            })
        }else{
            return ProductModel.updateOne({_id},{
                title,introduction,detail,editTime
            })
        }
    },

    // 获取产品列表
    getList:async ({_id})=>{
        return _id?ProductModel.find({_id}):ProductModel.find({})
    },

    // 删除产品
    delList:async ({_id})=>{
        return ProductModel.deleteOne({
            _id
        })
    },

    // publish:async ({_id,isPublish,editTime})=>{
    //     return NewsModel.updateOne({
    //         _id
    //     },{
    //         isPublish,
    //         editTime
    //     })
    // }
}

module.exports = ProductService