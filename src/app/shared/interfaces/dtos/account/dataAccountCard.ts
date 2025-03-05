// -Model's Imports
import { Account } from '@shared/models/account/account'

// -type's Imports
import { AccountDetails } from '@shared/types/global/account/accountTypeType'

export interface dataAccountCard extends Account {
	AccountDetails: AccountDetails
}
