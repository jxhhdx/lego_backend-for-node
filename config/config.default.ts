import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import * as dotenv from 'dotenv'
import { join } from 'path'

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
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    endpoint: 'dysmsapi.aliyuncs.com'
  }

  config.oss = {
    client: {
      accessKeyId: process.env.ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ACCESS_KEY_SECRET || '',
      bucket: 'created-on-march-1-2023',
      endpoint: 'oss-cn-hangzhou.aliyuncs.com'
    }
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: process.env.REDIS_PASSWORD,
      db: 0
    }
  }

  // gitee oauth config
  const giteeOauthConfig = {
    cid: process.env.GITEE_CID,
    secret: process.env.GITEE_SECRET,
    redirectURL: 'http://localhost:7001/api/users/passport/gitee/callback',
    authURL: 'https://gitee.com/oauth/token?grant_type=authorization_code',
    giteeUserAPI: 'https://gitee.com/api/v5/user'
  }

  config.jwt = {
    enable: true,
    secret: process.env.JWT_SECRET || '',
    match: [ '/api/users/getUserInfo', '/api/works', '/api/utils/upload*' ]
  }
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    baseUrl: 'default.url',
    myLogger: {
      allowedMethod: ['POST']
    },
    aliCloudConfig,
    giteeOauthConfig,
    H5BaseURL: 'http://localhost:7001/api/pages'
  };

  // config.multipart = {
  //   mode: 'file',
  //   tmpdir: join(appInfo.baseDir, 'uploads')
  // }
  config.multipart = {
    whitelist: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    fileSize: '1mb'
  }
  config.static = {
    dir: [
      { prefix: '/public', dir: join(appInfo.baseDir, 'app/public') },
      { prefix: '/uploads', dir: join(appInfo.baseDir, 'uploads') }
    ]
  }

  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  }

  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  };
};
