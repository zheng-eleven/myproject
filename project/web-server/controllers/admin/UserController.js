const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
    // 登录接口
    login: async (req, res) => {
        // console.log('前端传过来的用户数据:', req.body)
        //req.body 
        var result = await UserService.login(req.body)

        // 登录校验
        if (result.length === 0) {
            res.send({
                code: "-1",//返回信息
                error: "用户名密码不匹配"
            })
        } else {
            // 生成token(用户信息,有效时间7天)
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "7d")
            res.header("Authorization",token)//同时将token在响应头中返回给前端
            res.send({
                ActionType: "OK",
                data: {// 返回用户数据
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, //性别 ,0,1,2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            })
        }
    },

    // 更新用户数据接口(自己)
    upload:async (req, res) => {
        console.log('接收的到的用户修改数据:',req.body,req.file)
        const {username,introduction,gender} = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""
        var payload = JWT.verify(token)
        // console.log(payload._id)
        //调用service 模块更新 数据

        await UserService.upload({_id:payload._id,username,introduction,gender:Number(gender),avatar})
        if(avatar){
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,
                    gender:Number(gender),
                    avatar
                }
            })
        }else{
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,
                    gender:Number(gender)
                }
            })
        }
    },

    // 添加用户接口
    add:async (req, res) => {
        // console.log(req.body,req.file)
        const {username,introduction,gender,role,password} = req.body// 解析请求体数据
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""// 保存头像数据名
        await UserService.add({username,introduction,gender:Number(gender),avatar,role:Number(role),password})
        res.send({
            ActionType:"OK",
        })
    },

    // 获取用户列表数据
    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    // 删除用户数据
    delList:async (req,res)=>{
        // console.log('要删除的用户id',req.params.id)
        const result = await UserService.delList({_id:req.params.id})
        res.send({
            ActionType: "OK"
        })
    },
    
    // 修改用户数据(用户列表)
    putList:async (req,res)=>{
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK"
        })
    },
}

module.exports = UserController