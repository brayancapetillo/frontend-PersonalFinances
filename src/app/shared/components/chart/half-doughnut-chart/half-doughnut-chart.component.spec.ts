import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HalfDoughnutChartComponent } from './half-doughnut-chart.component'

describe('HalfDoughnutChartComponent', () => {
	let component: HalfDoughnutChartComponent
	let fixture: ComponentFixture<HalfDoughnutChartComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HalfDoughnutChartComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(HalfDoughnutChartComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
