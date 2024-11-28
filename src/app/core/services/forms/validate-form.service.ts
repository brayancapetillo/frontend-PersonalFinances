import { inject, Injectable } from '@angular/core'
import { ToastMessageService } from '../messageService/toast-message.service'
import { typeToastMessage } from '../../../shared/types/toastMessage/toastMessage'
import { FormControl } from '@angular/forms'
import { ErrorMessages } from '../../../shared/types/forms/errorControl'

interface ErrorDetails {
	title: string
	errors: Record<string, string>
}

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

	public notifyErrorFormControl(severity: typeToastMessage, control: FormControl, messageControl: ErrorDetails): void {
		if (control.errors) {
			Object.keys(control.errors).some((key: string) => {
				if (messageControl.errors[key]) {
					this.messagePNG.addAll(severity, messageControl.title, messageControl.errors[key])
					return true
				}
				return false
			})
		}
	}
}
