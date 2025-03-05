import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableSimpleComponent } from './table-simple.component'
import { typetableTransaction } from '@shared/constants/global/transaction/transaction'
import { columnDetail } from '@shared/interfaces/components/data/table/tablePrimeNg'

describe('TableSimpleComponent', () => {
	let component: TableSimpleComponent<typetableTransaction, columnDetail<typetableTransaction>>
	let fixture: ComponentFixture<TableSimpleComponent<typetableTransaction, columnDetail<typetableTransaction>>>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TableSimpleComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(TableSimpleComponent<typetableTransaction, columnDetail<typetableTransaction>>)

		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
