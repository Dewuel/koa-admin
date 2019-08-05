const User = require('../models/user')
const addToken = require('../utils/addToken')

class UserController{
  /**
   * 
   * @param {*} ctx 
   * @returns {Promise.<void>}
   */
   static async signup(ctx) {
    const {email,name,password,avatar} = ctx.request.body
    console.log(email,name,password,avatar);
    await User.create({email,name,password,avatar}).then((res) => {
      ctx.status = 200
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: res,
      }
    }).catch(err => {
      console.log(err)
      ctx.status = 512
      ctx.body = {
        code: 11000,
        msg: '邮箱已被占用',
        data: err
      }
    })
  }

  static async signin(ctx){
    const {email,password} = ctx.request.body
    await User.findOne({email}, (err, res) => {
      if(err) throw(err)
      // User.comparePassword
      res.comparePassword(password, (err, isMatch) => {
        if(err) throw err
        if(isMatch){
          let token = addToken(res)
          ctx.status = 200
          ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
              name: res.name,
              email: res.email,
              avatar: res.avatar,
              token: token
            }
          }
        } else {
          ctx.code = 505
          ctx.body = {
            code: 505,
            msg: '密码错误',
          }
        }
      })
    })
    console.log(res)
  }
}
module.exports = UserController