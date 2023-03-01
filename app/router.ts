import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // const jwt = app.middleware.jwt({
  //   secret: app.config.jwt.secret
  // })
  const jwtMiddleware = app.jwt as any
  // const logger = app.middleware.myLogger({
  //   allowedMethod: [ 'GET' ],
  // }, app)
  router.get('/', controller.home.index);
  router.post('/api/user/create', controller.user.createByEmail)
  router.get('/api/user/getUserInfo', app.jwt as any, controller.user.show)
  router.post('/api/user/loginByEmail', controller.user.loginByEmail)
  router.post('/api/user/genVeriCode', controller.user.sendVeriCode)
  router.post('/api/user/loginByCellphone', controller.user.loginByCellphone)
  router.get('/api/user/passport/gitee', controller.user.oauth)
  router.get('/api/user/passport/gitee/callback', controller.user.oauthByGitee)

  router.post('/api/works', jwtMiddleware, controller.work.createWork)
  router.post('/api/works/copy/:id', jwtMiddleware, controller.work.copyWork)
  router.get('/api/works', jwtMiddleware, controller.work.myList)
  router.get('/api/works/:id', jwtMiddleware, controller.work.myWork)
  router.get('/api/templates', controller.work.templateList)
  router.get('/api/templates/:id', controller.work.template)
  router.patch('/api/works/:id', jwtMiddleware, controller.work.update)
  router.delete('/api/works/:id', jwtMiddleware, controller.work.delete)

  router.post('/api/utils/upload', controller.utils.fileUploadByStream)

  router.post('/api/utils/uploadToOSS', controller.utils.uploadToOSS)
  router.post('/api/utils/testBusBoy', controller.utils.testBusBoy)

};
