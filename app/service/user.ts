import { Service } from 'egg'
import { UserProps } from '../model/user'

export default class UserService extends Service {
  public async createByEmail(payload: UserProps) {
    const { ctx } = this
    const { username, password } = payload
    const userCreatedDate: Partial<UserProps> = {
      username,
      password,
      email: username
    }
    return ctx.model.User.create(userCreatedDate)
  }

  async findById(id: string) {
    return this.ctx.model.User.findById(id)
  }
}