/**
 * @param router
 * @returns {void}
 */
module.exports = (router) => {
  router.prefix('/api/user')
  router.post('/signup', require('../controllers/user').signup)
}