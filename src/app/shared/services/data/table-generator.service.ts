import { Injectable } from '@angular/core'
import { columnDetail, dataColumn } from '@shared/interfaces/components/data/table/tablePrimeNg'

/**
 * Service responsible for dynamically generating table columns based on data rows and column constants.
 * The generated columns are used to build a table with headers, field names, and custom widths.
 *
 */
@Injectable({
	providedIn: 'root'
})
export class TableGeneratorService {
	constructor() {}

	/**
	 * Generates an array of `dataColumn` based on provided data rows and column constants.
	 * Maps over data rows and column constants to create column definitions.
	 *
	 * @param {Partial<T>[]} dataRow
	 * @param {columnDetail<R>[]} constants
	 * @typeParam T - Type of data row.
	 * @typeParam R - Type of column field.
	 *
	 * @returns {dataColumn<R>[]}
	 */
	public generateColumns<T, R>(dataRow: Partial<T>[], constants: columnDetail<R>[]): dataColumn<R>[] {
		if (!dataRow.length && !constants.length) {
			return []
		}

		// Extract the field names from the first data row or constants
		const fields = Object.keys(dataRow[0] ?? constants[0]) as Array<R>

		// Generate columns based on the field names and constants
		return fields.map((field: R) => {
			const columnDetail = constants.find((col) => col.columnName === field)
			return {
				field: field,
				header: columnDetail?.name ?? String(field),
				width: columnDetail?.widthColumn ?? 1
			}
		})
	}
}
