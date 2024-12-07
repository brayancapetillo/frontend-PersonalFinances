// - Angular Imports
import { Routes } from '@angular/router'

// - component's Imports
import { VerifyEmailComponent } from '@content/components/pages/auth/verify-email/verify-email.component'
import { LoginComponent } from '@content/auth/login/login.component'

export default [
	{ path: 'login', component: LoginComponent },
	{ path: 'verifyEmail', component: VerifyEmailComponent },
	{ path: '**', redirectTo: 'login' }
] as Routes
