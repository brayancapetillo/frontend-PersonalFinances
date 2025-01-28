// -Type's Imports
import { taccountType } from '@shared/types/global/accountType/accountType'

// -Model's Imports
import { transaction } from '@shared/models/transaction/transaction'

// -Enum's Imports
import { dataRow, statusTableEnum } from './tablePrimeNg'

// +============ ENUMS =============+
export enum transactionTypeEnum {
	NOT_REQUIRED = 1,
	REQUIRED,
	OPTIONAL
}

// +============ INTERFACES =============+
export interface tableTransaction extends Omit<transaction, keyof transaction> {
	id: dataRow<number, number>
	idCategory: dataRow<number, number>
	idAccount: dataRow<number, number>
	amount: dataRow<number, number>
	transactionDate: dataRow<Date, Date>
	idTransactionType: dataRow<number, statusTableEnum>
	thirdParties: dataRow<boolean, boolean>
	description: dataRow<string, string>
	createdAt: dataRow<Date, Date>
	nameCategory: dataRow<string, string>
	idCategoryType: dataRow<number, number>
	categoryTypeName: dataRow<string, string>
	nameAccount: dataRow<string, string>
	idBank: dataRow<number, number>
	idAccountType: dataRow<number, number>
	balance: dataRow<number, number>
	accountNumber: dataRow<string, string>
	bankCreatedAt: dataRow<Date, Date>
	bankUpdatedAt: dataRow<Date, Date>
	nameBank: dataRow<string, string>
	accountType: dataRow<taccountType, taccountType>
}
