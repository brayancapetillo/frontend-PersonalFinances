// - Core Angular Imports
import { environment } from '../../../../../environments/environment.development'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

// - HTTP's Imports
import { HttpClient } from '@angular/common/http'

// - Interface's Imports
import { refreshTokenDTO, tokenSummary } from '@shared/interfaces/dtos/auth/tokenSumary.dto'
import { userSummaryDTO } from '@shared/interfaces/dtos/user/userSummary.dto'
import { successResponse } from '@shared/interfaces/api/successResponse'
import { signUpDTO } from '@shared/interfaces/dtos/auth/signUp.dto'
import { signInDTO } from '@shared/interfaces/dtos/auth/signIn.dto'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http: HttpClient = inject(HttpClient)

	private generalUrlAuth: string = `${environment.urlApiPersonalFinances}auth`

	public signUp(data: signUpDTO): Observable<successResponse<userSummaryDTO>> {
		return this.http.post<successResponse<userSummaryDTO>>(`${this.generalUrlAuth}/signUp`, data)
	}

	public signIn(data: signInDTO): Observable<successResponse<tokenSummary>> {
		return this.http.post<successResponse<tokenSummary>>(`${this.generalUrlAuth}/signIn`, data)
	}

	public refreshToken(data: refreshTokenDTO): Observable<successResponse<tokenSummary>> {
		return this.http.post<successResponse<tokenSummary>>(`${this.generalUrlAuth}/refreshToken`, data)
	}
}
