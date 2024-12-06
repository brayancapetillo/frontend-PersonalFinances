// - Core Angular Imports
import { catchError, switchMap, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { inject } from '@angular/core'

// - Interface's Imports
import { tokenSummary } from '@shared/interfaces/dtos/auth/tokenSumary.dto'
import { successResponse } from '@shared/interfaces/api/successResponse'

// - HTTP's Imports
import { HttpInterceptorFn } from '@angular/common/http'

// - Constant's Imports
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'

// - Service's Imports
import { AuthService } from '@core/services/api/auth/auth.service'
import { CookieService } from 'ngx-cookie-service'

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
	//+============= SERVICES =============+\\
	const cookieService: CookieService = inject(CookieService)
	const authService: AuthService = inject(AuthService)
	const router: Router = inject(Router)

	// Retrieve tokens from cookies
	const token: string = cookieService.get('token')
	const refreshToken: string = cookieService.get('refreshToken')

	// Clone the request and set Authorization header
	const cloneReq = req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`
		}
	})

	// Intercept the request and handle token refrest if is necessary
	return next(cloneReq).pipe(
		catchError((error) => {
			if (error.status === clientErrorStatusCodes.UNAUTHORIZED) {
				return authService.refreshToken({ refreshToken }).pipe(
					switchMap((res: successResponse<tokenSummary>) => {
						if (!res.success) {
							router.navigate(['/auth/login'])
							return throwError(() => new Error('Unauthorized'))
						}

						const newToken = res.data.accessToken
						const newRefreshToken = res.data.refreshToken

						cookieService.set('token', newToken)
						cookieService.set('refreshToken', newRefreshToken)

						const retriedReq = req.clone({
							setHeaders: {
								Authorization: `Bearer ${newToken}`
							}
						})

						return next(retriedReq)
					}),
					catchError(() => {
						router.navigate(['/auth/login'])
						return throwError(() => new Error('Unauthorized'))
					})
				)
			}

			// TODO: This can be expanded to handle different status codes if necessary (404, 500)
			return throwError(() => error)
		})
	)
}
