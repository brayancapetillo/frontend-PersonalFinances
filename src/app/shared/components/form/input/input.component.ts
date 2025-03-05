import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { InputTextModule } from 'primeng/inputtext'

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [FontAwesomeModule, InputTextModule, ReactiveFormsModule, CommonModule],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss'
})
export class InputComponent {
	@Input({ required: true }) control!: FormControl
	@Input({ required: true }) type!: HTMLInputElement['type']
	@Input({ required: true }) placeHolder!: string
	@Input({ required: true }) icon!: IconDefinition
}
