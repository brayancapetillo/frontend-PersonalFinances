import { commonEnvironment, tCommonEnvironment } from './environment.common'

const env: Partial<tCommonEnvironment> = { urlApiPersonalFinances: 'http://localhost:4000/_api/v/' }

export const environment = { ...commonEnvironment, ...env }
