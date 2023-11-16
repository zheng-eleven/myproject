// 请求参数解析
const JobService = require("../../services/admin/JobService")

const JobController = {
    // 新增职位接口
    add:async (req,res)=>{
        // console.log('前端传过来的数据',req.body)
        const {title,worker,place,count,introduction,date1} = req.body
        //调用 service进行添加
        await JobService.add({
            title,worker,place,count,introduction,
            date1:new Date(),
        })
        res.send({
            ActionType:"OK"
        })
    },
    // 获取职位列表接口
    getList:async (req,res)=>{
        const result =await JobService.getList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
        console.log(result);
    },
     // 编辑职位更新接口
     updateList:async(req,res)=>{
        const {title,worker,place,count,introduction,date1,_id} = req.body
        //调用 service进行添加
        await JobService.updateList({
            _id,
            title,worker,place,count,introduction,
            date1:new Date(),
        })
        res.send({
            ActionType:"OK"
        })
    },
    // 删除产品接口
    delList:async (req,res)=>{
        await JobService.delList({_id:req.params.id})
        res.send({
            ActionType:"OK"
        })
    },
}

module.exports = JobController