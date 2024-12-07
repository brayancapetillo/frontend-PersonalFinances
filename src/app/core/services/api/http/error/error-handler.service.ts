// - Angular Imports
import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

// - Interface's Imports
import { errorHttp, errorSelector } from '@shared/types/api/error/errorHttp'
import { typeToastMessage } from '@shared/types/toastMessage/toastMessage'

// - Constant's Imports
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'

// - Service's Imports
import { ToastMessageService } from '@core/services/messageService/toast-message.service'

@Injectable({
	providedIn: 'root'
})
export class ErrorHandlerService {
	//+============= SERVICES =============+\\
	private readonly messagePNG: ToastMessageService = inject(ToastMessageService)

	constructor() {}

	private errorsHttp: errorHttp = {
		signUp: {
			title: 'Errores en el registro del usuario',
			errors: [
				{
					customTitle: 'Correo electrónico ya registrado',
					customMessage:
						'El correo electrónico proporcionado ya está asociado con una cuenta existente. Por favor, intente con otro correo electrónico.',
					status: clientErrorStatusCodes.CONFLICT,
					error: { message: 'email address is already registered', error: { status: clientErrorStatusCodes.CONFLICT, name: 'HttpError' } }
				},
				{
					customTitle: 'Número de teléfono ya registrado',
					customMessage:
						'El número de teléfono proporcionado ya está asociado con una cuenta existente. Por favor, intente con otro número de teléfono.',
					status: clientErrorStatusCodes.CONFLICT,
					error: { message: 'phone number is already registered', error: { status: clientErrorStatusCodes.CONFLICT, name: 'HttpError' } }
				}
			]
		},
		signIn: {
			title: 'Errores al iniciar sesión',
			errors: [
				{
					customTitle: 'Usuario no registrado',
					customMessage: 'Aún no estás registrado en el sistema, por favor regístrate.',
					status: clientErrorStatusCodes.FORBIDDEN,
					error: { message: 'user not found', error: { status: clientErrorStatusCodes.FORBIDDEN, name: 'HttpError' } }
				},
				{
					customTitle: 'Contraseña incorrecta',
					customMessage: 'La contraseña es incorrecta, por favor inténtalo nuevamente.',
					status: clientErrorStatusCodes.FORBIDDEN,
					error: { message: 'incorrect password', error: { status: clientErrorStatusCodes.FORBIDDEN, name: 'HttpError' } }
				}
			]
		}
	}

	public errorHandleHttp(severity: typeToastMessage, error: unknown, errorSelector: errorSelector) {
		if (error instanceof HttpErrorResponse) {
			if (error.status === serverErrorStatusCodes.INTERNAL_SERVER_ERROR) {
				this.messagePNG.add(
					'error',
					'Error del servidor',
					'Se ha producido un error interno en el servidor. Le recomendamos intentar nuevamente más tarde.'
				)
			}

			for (const localError of this.errorsHttp[errorSelector].errors) {
				if (localError.status === error.status && localError.error.message.toLocaleUpperCase() === error.error.message.toLocaleUpperCase()) {
					this.messagePNG.add(severity, localError.customTitle, localError.customMessage)
					break
				}
			}
		}
	}
}
