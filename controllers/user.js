const User = require('../models/user')

class UserController{
  /**
   * 
   * @param {*} ctx 
   * @returns {Promise.<void>}
   */
   static async signup(ctx) {
    const {email,name,password,avatar} = ctx.request.body
    console.log(email,name,password,avatar);
    let user = {
      email: email,
      name: name,
      password: password,
      avatar: avatar
    }
    // let result = await User.find({email})
    // if(result.length > 0){
    //   console.log(result)
    //   ctx.status = 412
    //   ctx.body = {
    //     code: 412,
    //     msg: '邮箱已被注册'
    //   }
    // } else {
    //   await User.create(user).then(res => {
    //     // console.log('res',res)
    //     ctx.status = 200
    //     ctx.body = {
    //       code: 200,
    //       msg: '注册成功',
    //       data: res
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
    await User.create(user).then(res => {
      // console.log('res',res)
      ctx.status = 200
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: res
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
    let res = await User.findOne({email}, (err, res) => {
      if(err) throw(err)
      // User.comparePassword
      res.comparePassword(password, (err, isMatch) => {
        if(err) throw err
        if(isMatch){
          ctx.status = 200
          ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
              name: res.name,
              email: res.email,
              avatar: res.avatar
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