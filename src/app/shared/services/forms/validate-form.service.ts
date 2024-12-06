// - Angular Imports
import { inject, Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'

// - Interface's and Type's Imports
import { controlSelector, ErrorDetails, ErrorMessages } from '@shared/types/forms/errorControl'
import { typeToastMessage } from '@shared/types/toastMessage/toastMessage'

// - Service's Imports
import { ToastMessageService } from '@core/services/messageService/toast-message.service'

@Injectable({
	providedIn: 'root'
})
export class ValidateFormService {
	//+============= SERVICES =============+\\
	private readonly messagePNG: ToastMessageService = inject(ToastMessageService)

	constructor() {}

	public errorMessage: ErrorMessages = {
		email: {
			title: 'Correo invalido',
			errors: {
				required: 'El correo es obligatorio',
				email: 'El correo no tiene un formato válido'
			}
		},
		password: {
			title: 'Contraseña invalida',
			errors: {
				required: 'La contraseña es obligatoria',
				passwordValidator: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial'
			}
		},
		userName: {
			title: 'Nombre invalido',
			errors: {
				required: 'El nombre es obligatorio',
				minlength: 'El nombre debe tener al menos 8 caracteres'
			}
		}
	}

	public notifyErrorFormControl(severity: typeToastMessage, control: FormControl, controlSelector: controlSelector): void {
		if (control.errors) {
			Object.keys(control.errors).some((key: string) => {
				if (this.errorMessage[controlSelector].errors[key]) {
					const messageControl: ErrorDetails = this.errorMessage[controlSelector]
					this.messagePNG.addAll(severity, messageControl.title, messageControl.errors[key])
					return true
				}
				return false
			})
		}
	}
}
