// -Model's Imports
import { UserPF } from '@shared/models/user/userPF'

export type userSummaryDTO = Omit<UserPF, 'password'>
