const Todo = require('../models/todos')
const checkToken = require('../utils/checkToken')

class Todos {

  static async addTodo(ctx) {
    const { todo } = ctx.request.body
    const auth = ctx.request.header.authorization;
    if (auth) {
      let decode = checkToken(auth)
      console.log(decode)
      let newTodo = new Todo({
        todo: todo,
        userId: decode.id
      })
      try {
        await newTodo.save((err, res) => {
          if (err) throw (err)
          console.log(res)
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('token 不存在')
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'token 不存在'
      }
    }
  }

  static async removeTodo() {

  }
}

module.exports = Todos;