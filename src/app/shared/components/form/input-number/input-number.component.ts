import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { InputNumberModule } from 'primeng/inputnumber'
@Component({
	selector: 'app-input-number',
	standalone: true,
	imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, InputNumberModule],
	templateUrl: './input-number.component.html',
	styleUrl: './input-number.component.scss'
})
export class InputNumberComponent {
	@Input({ required: false }) control!: FormControl
	@Input({ required: true }) placeHolder!: string
	@Input({ required: true }) icon!: IconDefinition
}
