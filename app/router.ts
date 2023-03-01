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
  router.prefix('/api')
  router.post('/user/create', controller.user.createByEmail)
  router.get('/user/getUserInfo', app.jwt as any, controller.user.show)
  router.post('/user/loginByEmail', controller.user.loginByEmail)
  router.post('/user/genVeriCode', controller.user.sendVeriCode)
  router.post('/user/loginByCellphone', controller.user.loginByCellphone)
  router.get('/user/passport/gitee', controller.user.oauth)
  router.get('/user/passport/gitee/callback', controller.user.oauthByGitee)

  router.post('/works', jwtMiddleware, controller.work.createWork)
  router.post('/works/copy/:id', jwtMiddleware, controller.work.copyWork)
  router.get('/works', jwtMiddleware, controller.work.myList)
  router.get('/works/:id', jwtMiddleware, controller.work.myWork)
  router.get('/templates', controller.work.templateList)
  router.get('/templates/:id', controller.work.template)
  router.patch('/works/:id', jwtMiddleware, controller.work.update)
  router.delete('/works/:id', jwtMiddleware, controller.work.delete)

  router.post('/utils/upload', controller.utils.fileUploadByStream)

  router.post('/utils/uploadToOSS', controller.utils.uploadToOSS)
  router.post('/utils/uploadByBusBoy', controller.utils.testBusBoy)
  router.post('/utils/uploadMutipleFiles', controller.utils.uploadMutipleFiles)
  router.get('/pages/:idAndUuid', controller.utils.renderH5Page)

};
