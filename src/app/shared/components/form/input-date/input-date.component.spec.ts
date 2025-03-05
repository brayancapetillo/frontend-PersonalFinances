import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputDateComponent } from './input-date.component'

describe('InputDateComponent', () => {
	let component: InputDateComponent
	let fixture: ComponentFixture<InputDateComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InputDateComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(InputDateComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
