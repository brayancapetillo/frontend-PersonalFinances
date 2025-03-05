import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { InputMaskModule } from 'primeng/inputmask'

@Component({
	selector: 'app-input-mask',
	standalone: true,
	imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, InputMaskModule],
	templateUrl: './input-mask.component.html',
	styleUrl: './input-mask.component.scss'
})
export class InputMaskComponent {
	@Input({ required: true }) control!: FormControl
	@Input({ required: true }) mask!: string
	@Input({ required: true }) icon!: IconDefinition
}
