// 操作数据库
const JobModel = require("../../models/JobModel")

const JobService = {
    // 新增职位
    add:async ({title,worker,place,count,introduction,date1,})=>{
        return JobModel.create({
            title,worker,place,count,introduction,date1,
        })
    },
    // 获取职位列表
    getList:async ({_id})=>{
        return _id?JobModel.find({_id}):JobModel.find({})
    },
    // 更新编辑职位
    updateList:async({title,worker,place,count,introduction,date1,_id})=>{   
            return JobModel.updateOne({_id},{
                title,worker,place,count,introduction,date1
            })  
    },
    // 删除职位
    delList:async ({_id})=>{
        return JobModel.deleteOne({
            _id
        })
    }
}

module.exports = JobService