// -Model's Imports
import { Account } from '@shared/models/account/account'
import { category } from '@shared/models/category/category'

export interface transaction {
	readonly id: number
	idCategory: number
	idAccount: number
	amount: number
	transactionDate: Date
	idTransactionType: number
	thirdParties: boolean
	description: string
	createdAt: Date
	category?: category
	account?: Account
}

export type propertyTransaction = keyof transaction
