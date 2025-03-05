import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SimpleGaugeChartComponent } from './simple-gauge-chart.component'

describe('SimpleGaugeChartComponent', () => {
	let component: SimpleGaugeChartComponent
	let fixture: ComponentFixture<SimpleGaugeChartComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SimpleGaugeChartComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(SimpleGaugeChartComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
