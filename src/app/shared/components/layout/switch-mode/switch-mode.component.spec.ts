import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SwitchModeComponent } from './switch-mode.component'

describe('SwitchModeComponent', () => {
	let component: SwitchModeComponent
	let fixture: ComponentFixture<SwitchModeComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SwitchModeComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(SwitchModeComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
