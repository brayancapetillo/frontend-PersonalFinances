export interface UserPF {
	readonly id: number
	email: string
	name: string
	lastName: string | null
	birthday: Date | null
	phone: string | null
	idSex: number
	idLenguage: number
	password: string
	verify: boolean
	createdAt: Date
	updatedAt: Date
}
