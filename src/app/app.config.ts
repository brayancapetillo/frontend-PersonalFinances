import { provideAnimations } from '@angular/platform-browser/animations'
import { ApplicationConfig } from '@angular/core'
import { MessageService } from 'primeng/api'
import { provideRouter, withViewTransitions } from '@angular/router'

import { routes } from './app.routes'
import { NgxParticlesModule } from '@tsparticles/angular'

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes, withViewTransitions()), provideAnimations(), NgxParticlesModule, MessageService]
}
