import { IBoot, Application } from 'egg'
import { createConnection, ConnectOptions } from 'mongoose'
import * as assert from 'assert'
import { join } from 'path'

export default class AppBoot implements IBoot {
  private readonly app: Application
  constructor(app: Application) {
    this.app = app
    const { url } = this.app.config.mongoose
    assert(url, '[egg-mongoose] url is required on config')
    const db = createConnection(url, { dbName: 'hello' } as ConnectOptions)
    db.on('connected', () => {
      app.logger.info(`[egg-mongoose] ${url} connected successfully`)
    })
    app.mongoose = db
  }
  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // this.app.config.coreMiddleware.unshift('myLogger')
  }
  // 文件加载完毕
  async didLoad() {
    // console.log('enable w illready', this.app.config.coreMiddleware)
  }
  // 插件启动完毕
  async willReady() {
    console.log('enable willready', this.app.config.coreMiddleware)
    const dir = join(this.app.config.baseDir, 'app/model')
    this.app.loader.loadToApp(dir, 'model', {
      caseStyle: 'upper'
    })
  }
  // 应用已启动完毕
  async didReady() {
    // const ctx = await this.app.createAnonymousContext()
    // const res = await ctx.service.test.sayHi('viking')
  }
}
