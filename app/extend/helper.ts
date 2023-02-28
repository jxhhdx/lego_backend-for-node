import { Context } from 'egg'
import { userErrorMessages } from '../controller/user'
import { workErrorMessages } from '../controller/work'
interface RespType {
  ctx: Context;
  res?: any;
  msg?: string;
}

const globalErrorMessages = {
  ...userErrorMessages,
  ...workErrorMessages
}

interface ErrorRespType {
  ctx: Context;
  errorType: keyof (typeof globalErrorMessages);
  error?: any;
}

export default {
  success({ ctx, res, msg }: RespType) {
    ctx.body = {
      errno: 0,
      data: res ? res : null,
      message: msg ? msg : '请求成功'
    }
    ctx.status = 200
  },
  error({ ctx, errorType, error }: ErrorRespType) {
    const { message, errno } = globalErrorMessages[errorType];
    ctx.body = {
      errno,
      message,
      ...(error && { error })
    }
    ctx.status = 200
  },

}
