import { Controller } from 'egg'

export default class TestController extends Controller {
  async index() {
    const { ctx } = this
    const { id } = ctx.params
    const { query, body } = ctx.request
    const resp = {
      query,
      id,
      body
    }
    ctx.body = resp
    ctx.status = 200
  }
}
