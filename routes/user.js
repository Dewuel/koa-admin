/**
 * @param router
 * @returns {void}
 */
module.exports = (router) => {
  router.prefix('/api/user')
  router.post('/signup', require('../controllers/user').signup)
  router.post('/signin', require('../controllers/user').signin)
  router.get('/userinfo', require('../controllers/user').getUser)
}