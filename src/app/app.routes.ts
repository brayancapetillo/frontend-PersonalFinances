import { Routes } from '@angular/router'
import { DashboardComponent } from '@content/components/dashboard/dashboard.component'
import { tokenGuard } from '@core/guards/token.guard'

export const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./routes/auth/auth.routes') },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [tokenGuard] },
	{ path: '**', redirectTo: 'auth' }
]
