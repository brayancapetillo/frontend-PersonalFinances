// -Interface's Imports
import { tableTransaction, transactionTypeEnum } from '@shared/interfaces/components/data/table/tableTransaction'
import { columnDetail } from '@shared/interfaces/components/data/table/tablePrimeNg'

// -PrimeNg's Imports
import { Tag } from 'primeng/tag'

// +============ TYPES =============+
export type typetableTransaction = keyof tableTransaction

// +============ CONSTANTS =============+
export const TableTransactionColumns: columnDetail<typetableTransaction>[] = [
	{ columnName: 'id', name: 'ID', widthColumn: 5 },
	{ columnName: 'idCategory', name: 'ID Categoría', widthColumn: 8 },
	{ columnName: 'idAccount', name: 'ID Cuenta', widthColumn: 8 },
	{ columnName: 'amount', name: 'Monto', widthColumn: 8 },
	{ columnName: 'transactionDate', name: 'Fecha de Transacción', widthColumn: 12 },
	{ columnName: 'idTransactionType', name: 'Tipo de Transacción', widthColumn: 12 },
	{ columnName: 'thirdParties', name: 'Terceras Personas', widthColumn: 10 },
	{ columnName: 'description', name: 'Descripción', widthColumn: 18 },
	{ columnName: 'createdAt', name: 'Creación de Transacción', widthColumn: 12 },
	{ columnName: 'nameCategory', name: 'Categoría', widthColumn: 12 },
	{ columnName: 'idCategoryType', name: 'ID Tipo de Categoría', widthColumn: 12 },
	{ columnName: 'categoryTypeName', name: 'Tipo de Categoría', widthColumn: 12 },
	{ columnName: 'nameAccount', name: 'Nombre de Cuenta', widthColumn: 15 },
	{ columnName: 'idBank', name: 'ID Banco', widthColumn: 8 },
	{ columnName: 'idAccountType', name: 'ID Tipo de Cuenta', widthColumn: 8 },
	{ columnName: 'balance', name: 'Monto de Cuenta', widthColumn: 12 },
	{ columnName: 'accountNumber', name: 'Número de Cuenta', widthColumn: 8 },
	{ columnName: 'bankCreatedAt', name: 'Fecha de Creación de Cuenta', widthColumn: 12 },
	{ columnName: 'bankUpdatedAt', name: 'Fecha de Actualización de Cuenta', widthColumn: 12 },
	{ columnName: 'nameBank', name: 'Banco', widthColumn: 12 },
	{ columnName: 'accountType', name: 'Tipo de Cuenta', widthColumn: 12 }
]

export const TransactionTypeDetails: transactionTypeDetail[] = [
	{ id: transactionTypeEnum.NOT_REQUIRED, name: 'No Requerido', severity: 'danger' },
	{ id: transactionTypeEnum.REQUIRED, name: 'Requerido', severity: 'success' },
	{ id: transactionTypeEnum.OPTIONAL, name: 'Opcional', severity: 'warning' }
]

// +============ INTERFACES =============+
export interface transactionTypeDetail {
	id: transactionTypeEnum
	name: string
	severity: Tag['severity']
}
