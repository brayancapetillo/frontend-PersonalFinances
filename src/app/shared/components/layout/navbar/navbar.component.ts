// - Angular Imports
import { Component, inject, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'

// - Component's Imports
import { SwitchModeComponent } from '../switch-mode/switch-mode.component'

// -FontAwesome imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBarsStaggered, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

/**
 * Navbar component of the application.
 *
 * This component is responsible for displaying a navbar with icons
 * for navigation, notifications, and dropdown options. It integrates
 * with the theme service to manage the toggle state of the sidebar
 * and includes a mode switcher for dark/light themes.
 *
 * @component
 * @example
 * <app-navbar></app-navbar>
 */
@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [FontAwesomeModule, SwitchModeComponent, CommonModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
	//+===================== SERVICES =====================+\\
	private readonly libraryIcons: FaIconLibrary = inject(FaIconLibrary)
	private readonly themeService: ThemeService = inject(ThemeService)

	//+======================= GOBAL =======================+\\
	public isToggleBar: boolean = false
	private themeSubscription!: Subscription

	/**
	 * Constructor of the NavbarComponent.
	 *
	 * Initializes FontAwesome icons for the navbar and subscribes to the theme
	 * service to manage the sidebar's visibility state.
	 */
	constructor() {
		this.libraryIcons.addIcons(faBarsStaggered, faBell, faCaretDown)

		// Subscribe to the theme service to manage the toggle bar state
		this.themeSubscription = this.themeService.toggleBar.subscribe((state: boolean) => {
			this.isToggleBar = state
		})
	}

	/**
	 * Toggles the visibility of the sidebar.
	 *
	 * This method is triggered when the user interacts with the navbar (e.g., clicking the hamburger icon).
	 * @public
	 * @returns {void}
	 */
	public toggleBar(): void {
		this.themeService.toggleBar = !this.isToggleBar
	}

	/**
	 * Angular lifecycle method that is called when the component is destroyed.
	 *
	 * Unsubscribes from the theme service to prevent memory leaks.
	 * @public
	 * @returns {void}
	 */
	public ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
	}
}
