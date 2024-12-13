// -Angular Core's imports
import { Component, inject, Input, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Subscription } from 'rxjs'

// -FontAwesome's imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

// -Service's imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

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
export class SwitchModeComponent implements OnDestroy {
	//+===================== SERVICES =====================+\\
	private readonly themeService: ThemeService = inject(ThemeService)

	//+===================== INPUTS =====================+\\
	@Input() Check!: boolean
	public darkTheme: boolean = false

	private themeSubscription!: Subscription

	/**
	 * Create instance of SwitchModeComponent and initializes the FontAwesome icon Library
	 * with the icons needed for light ans dark modes.
	 *
	 * @param library {FaIconLibrary}
	 */
	constructor(library: FaIconLibrary) {
		library.addIcons(faMoon, faSun)
		this.themeSubscription = this.themeService.darkTheme.subscribe((state: boolean) => {
			this.darkTheme = state
		})
	}

	/**
	 * Toggle the theme between light and dark.
	 *
	 * @returns {void}
	 */
	public switchTheme(): void {
		this.themeService.darkTheme = this.darkTheme
	}

	public ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
	}
}
