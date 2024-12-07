import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Model3dComponent } from './model3d.component'

describe('Model3dComponent', () => {
	let component: Model3dComponent
	let fixture: ComponentFixture<Model3dComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Model3dComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(Model3dComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
