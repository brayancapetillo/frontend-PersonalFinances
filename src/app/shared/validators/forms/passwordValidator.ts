// - Forms Angular Imports
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

const patternPassword: RegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&^#_+=~.-])[A-Za-z\\d@$!%*?&^#_+=~.-]{8,}$')

export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value

	if (!patternPassword.test(value)) {
		return { passwordValidator: true }
	}

	return null
}

export const passwordMatchValidator: ValidatorFn = (
	formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>
): ValidationErrors | null => {
	const password: string = formGroupControl.value.password
	const confirmPassword: string = formGroupControl.value.confirmPassword

	return password !== confirmPassword ? { passwordMatchValidator: true } : null
}
