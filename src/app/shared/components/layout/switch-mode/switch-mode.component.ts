// -Angular Core's imports
import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

// -FontAwesome's imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

/**
 * Reusable component to toggle between light and dark themes.
 * This component can be used across the application wherever theme toggling is needed.
 */
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

	/**
	 * Create instance of SwitchModeComponent and initializes the FontAwesome icon Library
	 * with the icons needed for light ans dark modes.
	 *
	 * @param library {FaIconLibrary}
	 */
	constructor(library: FaIconLibrary) {
		library.addIcons(faMoon, faSun)
	}

	/**
	 * Toggle the theme between light and dark.
	 *
	 * @returns {void}
	 */
	public switchTheme(): void {
		const htmlElement: HTMLElement = document.querySelector('body') as HTMLElement
		this.darkTheme ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')
	}
}
