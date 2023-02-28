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

  router.post('/api/work/createWork', jwtMiddleware, controller.work.createWork)
  router.get('/api/work/myList', jwtMiddleware, controller.work.myList)
  router.get('/api/work/templateList', controller.work.templateList)
};
