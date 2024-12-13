// - Angular Imports
import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

// - Interface's Imports
import { tokenSummary } from '@shared/interfaces/dtos/auth/tokenSumary.dto'
import { signInSummary } from '@shared/interfaces/dtos/auth/signIn.dto'

// - Constant's Imports
import { cookies } from '@shared/constants/cookies/cookies'

// - Service's Imports
import { CookieService } from 'ngx-cookie-service'

// - Dependency's Imports
import { jwtDecode } from 'jwt-decode'

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly cookieService: CookieService = inject(CookieService)
	private readonly token: string = this.cookieService.get(cookies.token)
	private readonly refreshToken: string = this.cookieService.get(cookies.refreshToken)

	private $dataUser: BehaviorSubject<signInSummary> = new BehaviorSubject<signInSummary>({ id: 0, name: '' })
	constructor() {
		if (this.token && this.refreshToken) {
			this.setUserByToken({ accessToken: this.token, refreshToken: this.refreshToken })
		}
	}

	get getUser(): Observable<signInSummary> {
		return this.$dataUser.asObservable()
	}

	set setUser(user: signInSummary) {
		this.$dataUser.next(user)
	}

	public async setUserByToken(tokens: tokenSummary): Promise<void> {
		try {
			this.cookieService.set(cookies.token, tokens.accessToken, { path: '/' })
			this.cookieService.set(cookies.refreshToken, tokens.refreshToken, { path: '/' })

			const decodeToken = jwtDecode(tokens.accessToken) as signInSummary
			const { id, name } = decodeToken

			const dataUser: signInSummary = { id: id, name: name }
			this.$dataUser.next(dataUser)
		} catch (error) {
			// TODO: implement component 401 unauthorized
			console.log(error)
		}
	}
}
