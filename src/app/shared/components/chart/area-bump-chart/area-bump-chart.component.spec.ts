import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AreaBumpChartComponent } from './area-bump-chart.component'

describe('AreaBumpChartComponent', () => {
	let component: AreaBumpChartComponent
	let fixture: ComponentFixture<AreaBumpChartComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AreaBumpChartComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(AreaBumpChartComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
