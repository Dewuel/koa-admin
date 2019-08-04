/**
 * @param router
 * @returns {void}
 */
module.exports = (router) => {
  router.prefix('/api')
  router.post('/add', require('../controllers/todo').addTodo)
}