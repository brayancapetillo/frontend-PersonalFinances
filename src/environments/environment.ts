import { commonEnvironment, tCommonEnvironment } from './environment.common'

const env: Partial<tCommonEnvironment> = { urlApiPersonalFinances: 'http://localhost:4002/_api/v/' }

export const environment = { ...commonEnvironment, ...env }
