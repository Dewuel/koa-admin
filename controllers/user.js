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
    let user = new User({
      email: email,
      name: name,
      password: password,
      avatar: avatar
    })
    let result = await User.find({email: email})
    if(result.length > 0){
      console.log(result)
      ctx.status = 412
      ctx.body = {
        code: 412,
        msg: '邮箱已被注册'
      }
    } else {
      await user.save().then(res => {
        console.log('res',res)
        ctx.status = 200
        ctx.body = {
          code: 200,
          msg: '注册成功',
          data: res
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
module.exports = UserController