import { HttpErrorResponse } from '@angular/common/http'

export interface error {
	status: number
	name: string
}

export interface errorCustom {
	error: error
	message: string
}

export interface customHttpErrorResponse extends Pick<HttpErrorResponse, 'error' | 'status'> {
	customTitle: string
	customMessage: string
	error: errorCustom
}

export interface errorHttpDetail {
	title: string
	errors: customHttpErrorResponse[]
}

type errorHttp = Record<'signUp' | 'signIn', errorHttpDetail>

type errorSelector = keyof errorHttp
