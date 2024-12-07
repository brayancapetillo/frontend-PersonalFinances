import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-checkbox',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './checkbox.component.html',
	styleUrl: './checkbox.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true
		}
	]
})
export class CheckboxComponent implements ControlValueAccessor {
	@Input() disabled: boolean = false
	@Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

	checked: boolean = false

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onChange = (value: boolean) => {}
	onTouched = () => {}

	public writeValue(value: boolean): void {
		this.checked = value
	}

	public registerOnChange(fn: (value: boolean) => void): void {
		this.onChange = fn
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}

	public onCheckboxChange(event: Event): void {
		const target = event.target as HTMLInputElement
		this.checked = target.checked
		this.onChange(this.checked)
		this.checkedChange.emit(this.checked)
		this.onTouched()
	}
}
