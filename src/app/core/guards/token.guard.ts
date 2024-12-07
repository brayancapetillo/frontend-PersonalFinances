import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

export const tokenGuard: CanActivateFn = () => {
	const cookieService: CookieService = inject(CookieService)
	const router = inject(Router)

	const token: string = cookieService.get('token')

	if (!token) {
		router.navigate(['auth/login'])
		return false
	}

	return true
}
