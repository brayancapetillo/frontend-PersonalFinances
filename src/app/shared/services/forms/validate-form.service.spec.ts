import { TestBed } from '@angular/core/testing'

import { ValidateFormService } from './validate-form.service'

describe('ValidateFormService', () => {
	let service: ValidateFormService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(ValidateFormService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
