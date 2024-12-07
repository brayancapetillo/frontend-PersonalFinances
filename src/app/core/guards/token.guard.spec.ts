import { TestBed } from '@angular/core/testing'
import { CanActivateFn } from '@angular/router'

import { tokenGuard } from './token.guard'

describe('tokenGuard', () => {
	const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => tokenGuard(...guardParameters))

	beforeEach(() => {
		TestBed.configureTestingModule({})
	})

	it('should be created', () => {
		expect(executeGuard).toBeTruthy()
	})
})
