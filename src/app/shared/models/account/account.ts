// -Model's Imports
import { AccountType } from '@shared/models/accountType/accountType'
import { Bank } from '@shared/models/bank/bank'

export interface Account {
	readonly id: number
	idUser: number
	name: string
	idBank: number
	idAccountType: number
	balance: number
	accountNumber: string
	createdAt: Date
	updatedAt: Date
	bank?: Bank
	accountType?: AccountType
}
