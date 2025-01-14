// +============ ENUMS =============+ \\
export enum typeRow {
	STRING = 1,
	DATE,
	NUMBER,
	BALANCE,
	STATUS,
	ACTIVITY,
	BOOLEAN
}

export enum statusTableEnum {
	TYPE_TRANSACTION = 1
}

// +============ INTERFACES =============+ \\
export interface dataColumn<T> {
	field: T
	header: string
	width: number
}

export interface dataRow<T, R> {
	value: T
	typeRow: typeRow
	tagValue?: R
}

export interface columnDetail<T> {
	columnName: T
	name: string
	widthColumn: number
}
