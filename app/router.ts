import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const logger = app.middleware.myLogger({
    allowedMethod: [ 'GET' ],
  }, app)
  router.get('/', controller.home.index);
  router.get('/test/:id', controller.test.index)
  router.post('/test/:id', controller.test.index)
  router.get('/dog', logger, controller.test.getDog)
  router.post('/api/user/create', controller.user.createByEmail)
  router.get('/api/user/:id', controller.user.show)
  router.post('/api/user/current', controller.user.show)
  router.post('/api/user/login', controller.user.loginByEmail)
};
