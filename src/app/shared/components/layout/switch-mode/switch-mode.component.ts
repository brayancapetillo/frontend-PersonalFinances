import { Component, Input } from '@angular/core'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-switch-mode',
	standalone: true,
	imports: [FontAwesomeModule, FormsModule, CommonModule],
	templateUrl: './switch-mode.component.html',
	styleUrl: './switch-mode.component.scss'
})
export class SwitchModeComponent {
	//+===================== INPUTS =====================+\\
	@Input() Check!: boolean

	public darkTheme: boolean = false

	constructor(library: FaIconLibrary) {
		library.addIcons(faMoon, faSun)
	}

	public switchTheme(): void {
		const htmlElement: HTMLElement = document.querySelector('body') as HTMLElement
		this.darkTheme ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')
	}
}
