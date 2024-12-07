import { UserPF } from '@shared/models/user/userPF'

export type signUpDTO = Omit<UserPF, 'id' | 'verify' | 'createdAt' | 'updatedAt'>
