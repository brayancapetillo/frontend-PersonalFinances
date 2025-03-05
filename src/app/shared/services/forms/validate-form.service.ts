// - Angular Imports
import { inject, Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'

// - Interface's and Type's Imports
import { controlSelector, ErrorDetails, ErrorMessages } from '@shared/types/forms/errorControl'
import { typeToastMessage } from '@shared/types/toastMessage/toastMessage'

// - Service's Imports
import { ToastMessageService } from '@core/services/messageService/toast-message.service'

/**
 * Service to validate form controls and display error messages.
 * This service checks for errors in form controls and sends error notifications.
 */
@Injectable({
	providedIn: 'root'
})
export class ValidateFormService {
	//+============= SERVICES =============+\\
	private readonly messagePNG: ToastMessageService = inject(ToastMessageService)

	constructor() {}

	/**
	 * Defines the error messages for various form controls.
	 * Each control has a title and a set of error messages for different validation rules.
	 */
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

	/**
	 * Notifies the user with an error message when a form control has validation errors.
	 * It triggers a toast message based on the control selector.
	 *
	 * @param {typeToastMessage} severity - The error message severity (e.g., 'error', 'warning').
	 * @param {FormControl} control - The `FormControl` instance being validated.
	 * @param {controlSelector} controlSelector - The control to validate (e.g., 'email', 'password').
	 *
	 * @returns void
	 *
	 * @example
	 * validateFormService.notifyErrorFormControl('error', formControlInstance, 'email');
	 */
	public notifyErrorFormControl(severity: typeToastMessage, control: FormControl, controlSelector: controlSelector): void {
		// Check if there are validation errors on the control
		if (control.errors) {
			// Iterate through errors to find the matching error message
			Object.keys(control.errors).some((key: string) => {
				if (this.errorMessage[controlSelector].errors[key]) {
					const messageControl: ErrorDetails = this.errorMessage[controlSelector]
					// Show the error message using the toast service
					this.messagePNG.addAll(severity, messageControl.title, messageControl.errors[key])
					return true
				}
				return false
			})
		}
	}
}
