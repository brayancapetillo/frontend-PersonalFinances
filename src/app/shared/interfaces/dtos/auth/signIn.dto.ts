import { UserPF } from '@shared/models/user/userPF'

export type signInDTO = Pick<UserPF, 'email' | 'password'>

export type signInSummary = Pick<UserPF, 'id' | 'name'>
