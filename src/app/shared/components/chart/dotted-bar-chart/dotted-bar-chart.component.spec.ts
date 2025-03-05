import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DottedBarChartComponent } from './dotted-bar-chart.component'

describe('DottedBarChartComponent', () => {
	let component: DottedBarChartComponent
	let fixture: ComponentFixture<DottedBarChartComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DottedBarChartComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(DottedBarChartComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
