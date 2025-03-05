import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { DropdownModule } from 'primeng/dropdown'

@Component({
	selector: 'app-input-select',
	standalone: true,
	imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, DropdownModule],
	templateUrl: './input-select.component.html',
	styleUrl: './input-select.component.scss'
})
export class InputSelectComponent<T> {
	@Input({ required: true }) control!: FormControl
	@Input({ required: false }) placeHolder!: string
	@Input({ required: true }) icon!: IconDefinition
	@Input({ required: true }) options: T[] = []
	@Input({ required: true }) optionLabel!: string
}
