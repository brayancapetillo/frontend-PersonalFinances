// - Angular Imports
import { Routes } from '@angular/router'

// - token's Imports
import { tokenGuard } from '@core/guards/token.guard'

// - component's Imports
import { DashboardComponent } from '@shared/components/layout/dashboard/dashboard.component'

export const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./routes/auth/auth.routes') },
	{ path: 'dashboard', component: DashboardComponent, loadChildren: () => import('./routes/dashboard/dashboard.routes'), canActivate: [tokenGuard] },
	{ path: '**', redirectTo: 'auth' }
]
