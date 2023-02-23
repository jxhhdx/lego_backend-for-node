import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631677352881_6029';

  // add your egg config in here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false
    }
  }
  config.view = {
    defaultViewEngine: 'nunjucks'
  }
  config.bcrypt = {
    saltRounds: 10
  }
  // config.logger = {
  //   consoleLevel: 'DEBUG'
  // }
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017',
    options: { dbName: 'legodb', user: 'root',pass: '123456' } as any
  }
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    baseUrl: 'default.url',
    myLogger: {
      allowedMethod: [ 'POST' ]
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  };
};
