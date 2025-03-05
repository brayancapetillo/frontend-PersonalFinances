import { TestBed } from '@angular/core/testing'

import { TableGeneratorService } from './table-generator.service'

describe('TableGeneratorService', () => {
	let service: TableGeneratorService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(TableGeneratorService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
