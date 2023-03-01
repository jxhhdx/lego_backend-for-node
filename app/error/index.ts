import { userErrorMessages } from './user'
import { workErrorMessages } from './work'
import { utilsErrorMessages } from './utils'

export type GlobalErrorTypes = keyof (typeof userErrorMessages & typeof workErrorMessages)
export const globalErrorMessages = {
  ...userErrorMessages,
  ...workErrorMessages,
  ...utilsErrorMessages,
}
