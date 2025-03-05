import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { CalendarModule } from 'primeng/calendar'
@Component({
	selector: 'app-input-date',
	standalone: true,
	imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, CalendarModule],
	templateUrl: './input-date.component.html',
	styleUrl: './input-date.component.scss'
})
export class InputDateComponent {
	@Input({ required: true }) control!: FormControl
	@Input({ required: false }) placeHolder!: string
	@Input({ required: true }) icon!: IconDefinition
	@Input({ required: true }) dateFormat!: string
	@Input({ required: true }) readOnly!: boolean
}
