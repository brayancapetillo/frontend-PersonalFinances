import { Component, Input } from '@angular/core'
import { dataColumn, statusTableEnum, typeRow } from '@shared/interfaces/components/data/table/tablePrimeNg'
import { TableModule } from 'primeng/table'
import { Tag, TagModule } from 'primeng/tag'
import { DateFormatPipe } from '@shared/pipes/dates/date-format.pipe'
import { CommonModule } from '@angular/common'
import { transactionTypeDetail, TransactionTypeDetails } from '@shared/constants/global/transaction/transaction'

@Component({
	selector: 'app-table-simple',
	standalone: true,
	imports: [TableModule, TagModule, DateFormatPipe, CommonModule],
	templateUrl: './table-simple.component.html',
	styleUrl: './table-simple.component.scss'
})
export class TableSimpleComponent<T, R> {
	@Input({ required: true }) dataTable: Partial<T>[] = []
	@Input({ required: true }) columns: dataColumn<R>[] = []

	public typeRow = typeRow

	constructor() {}

	getSeverity(value: number, typeStatus: statusTableEnum): Tag['severity'] {
		if (typeStatus === statusTableEnum.TYPE_TRANSACTION) {
			return TransactionTypeDetails.find((item: transactionTypeDetail) => item.id === value)?.severity ?? undefined
		}

		return undefined
	}

	getValueStatus(value: number, typeStatus: statusTableEnum): string {
		if (typeStatus === statusTableEnum.TYPE_TRANSACTION) {
			return TransactionTypeDetails.find((item: transactionTypeDetail) => item.id === value)?.name ?? ''
		}

		return 'error'
	}
}
