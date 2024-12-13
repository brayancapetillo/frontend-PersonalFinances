// - Angular Imports
import { Component, inject, Input, OnChanges, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { Subscription } from 'rxjs'

// - Interface's Imports
import { sidebarRoute } from '@shared/interfaces/components/sidebar/sidebar'

// -FontAwesome imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

/**
 * Sidebar component of the application.
 *
 * This component is responsible for displaying a sidebar with the application's routes and managing its visibility state.
 * It also allows adding custom FontAwesome icons to the sidebar routes.
 *
 * @component
 * @example
 * <app-sidebar [routesApp]="routes"></app-sidebar>
 */
@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, CommonModule, RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges, OnDestroy {
	//+===================== SERVICES =====================+\\
	private readonly libraryIcons: FaIconLibrary = inject(FaIconLibrary)
	private readonly themeService: ThemeService = inject(ThemeService)

	//+===================== INPUTS =====================+\\
	/**
	 * List of routes to display in the sidebar.
	 * Each route includes an `icon` property to display the corresponding icon.
	 *
	 * @type {sidebarRoute[]}
	 * @default []
	 */
	@Input() routesApp: sidebarRoute[] = []

	public isToggleBar: boolean = true
	private themeSubscription!: Subscription

	/**
	 * Constructor of the component.
	 *
	 * Initializes the icons library.
	 * and subscribes to the theme service to control the sidebar's visibility.
	 */
	constructor() {
		this.libraryIcons.addIcons(faRightFromBracket)

		// Subscribe to the theme service to update the sidebar visibility state
		this.themeSubscription = this.themeService.toggleBar.subscribe((state: boolean) => {
			this.isToggleBar = state
		})
	}

	/**
	 * Angular lifecycle method called when the component's inputs change.
	 *
	 * Adds icons to the FontAwesome library for each route in the sidebar.
	 * @public
	 * @returns {void}
	 */
	public ngOnChanges(): void {
		for (const route of this.routesApp) {
			this.libraryIcons.addIcons(route.icon)
		}
	}

	/**
	 * Angular lifecycle method called when the component is destroyed.
	 *
	 * Unsubscribes from the theme service to prevent memory leaks.
	 * @public
	 * @returns {void}
	 */
	public ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
	}
}
