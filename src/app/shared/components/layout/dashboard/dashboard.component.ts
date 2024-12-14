// - Angular Imports
import { RouterOutlet } from '@angular/router'
import { Component } from '@angular/core'

// - Component's Imports
import { SidebarComponent } from '@shared/components/layout/sidebar/sidebar.component'
import { NavbarComponent } from '@shared/components/layout/navbar/navbar.component'

// - Interface's Imports
import { sidebarRoute } from '@shared/interfaces/components/sidebar/sidebar'

// -FontAwesome imports
import { faHouse, faChartSimple, faGears, faCreditCard, faCoins, faBullseye, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

/**
 * Dashboard component of the application.
 *
 * This component serves as the primary layout for the dashboard section of the application.
 * It integrates the `SidebarComponent` and `NavbarComponent` to provide navigation and functionality.
 * The routes for the sidebar are dynamically loaded, each with an icon and corresponding navigation link.
 *
 * @component
 * @example
 * <app-dashboard></app-dashboard>
 */
@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [SidebarComponent, NavbarComponent, RouterOutlet],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
	/**
	 * List of routes displayed in the sidebar.
	 * Each route includes an icon, a name, and a navigation link.
	 *
	 * @type {sidebarRoute[]}
	 */
	public sidebarRoute: sidebarRoute[] = [
		{ icon: faHouse, name: 'home', routeLink: 'home' },
		{ icon: faChartSimple, name: 'analitycs', routeLink: 'analitycs' },
		{ icon: faCreditCard, name: 'cards', routeLink: 'cards' },
		{ icon: faCoins, name: 'transactions', routeLink: 'transactions' },
		{ icon: faHandHoldingDollar, name: 'budgets', routeLink: 'budgets' },
		{ icon: faBullseye, name: 'goals', routeLink: 'goals' },
		{ icon: faGears, name: 'settings', routeLink: 'settings' }
	]
}
