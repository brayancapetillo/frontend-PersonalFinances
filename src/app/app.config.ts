import { provideAnimations } from '@angular/platform-browser/animations'
import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), provideAnimations()]
}
