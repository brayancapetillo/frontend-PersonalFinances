// - Angular Imports
import { Routes } from '@angular/router'

// - component's Imports
import { AnalitycsComponent } from '@content/components/pages/dashboard/analitycs/analitycs.component'
import { BudgetsComponent } from '@content/components/pages/dashboard/budgets/budgets.component'
import { CardsComponent } from '@content/components/pages/dashboard/cards/cards.component'
import { GoalsComponent } from '@content/components/pages/dashboard/goals/goals.component'
import { HomeComponent } from '@content/components/pages/dashboard/home/home.component'
import { SettingsComponent } from '@content/components/pages/dashboard/settings/settings.component'
import { TransactionsComponent } from '@content/components/pages/dashboard/transactions/transactions.component'

export default [
	{ path: 'home', component: HomeComponent },
	{ path: 'analitycs', component: AnalitycsComponent },
	{ path: 'cards', component: CardsComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'budgets', component: BudgetsComponent },
	{ path: 'goals', component: GoalsComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: '**', redirectTo: 'home' }
] as Routes
