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
	creditUsed?: number
	creditLimit?: number
	cutOffDate?: Date
	paymentDueDate?: Date
	createdAt: Date
	updatedAt: Date
	bank?: Bank
	accountType?: AccountType
}
