/**
 * @param router
 * @returns {void}
 */
module.exports = (router) => {
  router.prefix('/api')
  router.post('/add', require('../controllers/todo').addTodo);
  router.post('/deleteTodo', require('../controllers/todo').removeTodo);
  router.post('/getTodos', require('../controllers/todo').getTodos);
  router.post('/updateTodo', require('../controllers/todo').updateTodos);
}