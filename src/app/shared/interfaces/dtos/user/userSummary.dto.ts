import { UserPF } from '@shared/models/user/userPF'

export type userSummaryDTO = Omit<UserPF, 'password'>
