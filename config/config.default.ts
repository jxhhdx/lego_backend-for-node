import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import * as dotenv from 'dotenv'

dotenv.config()
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631677352881_6029';

  // add your egg config in here
  config.middleware = ['customError'];
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
    options: { 
      dbName: 'legodb', 
      user: 'root', 
      pass: process.env.MONGOOSE_PASSWORD 
    } as any
  }

  const aliCloudConfig = {
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: 'dysmsapi.aliyuncs.com'
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: process.env.REDIS_PASSWORD,
      db: 0
    }
  }

  config.jwt = {
    secret: '1234567890'
  }
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    baseUrl: 'default.url',
    myLogger: {
      allowedMethod: ['POST']
    },
    aliCloudConfig
  };

  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  };
};
