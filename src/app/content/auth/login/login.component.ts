import { Component } from '@angular/core'
import { Engine, ParticlesOptions, RecursivePartial } from '@tsparticles/engine'
import { NgxParticlesModule } from '@tsparticles/angular'
import { loadSlim } from '@tsparticles/slim'
import { particlesOptionsConfig } from '../../../../assets/animations/particles/particles'
import { Model3dComponent } from '../../../shared/components/models/model3d/model3d.component'
import { PasswordModule } from 'primeng/password'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { ButtonModule } from 'primeng/button'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { CheckboxComponent } from '../../../shared/components/input/checkbox/checkbox.component'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		NgxParticlesModule,
		Model3dComponent,
		PasswordModule,
		InputTextModule,
		FloatLabelModule,
		InputGroupModule,
		InputGroupAddonModule,
		FontAwesomeModule,
		CheckboxComponent,
		ButtonModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	constructor(library: FaIconLibrary) {
		library.addIcons(faUser, faLock, faFacebook, faGoogle, faGithub) // Register your icons here
	}
	public particlesOptions: RecursivePartial<ParticlesOptions> = particlesOptionsConfig

	async particlesInit(engine: Engine): Promise<void> {
		await loadSlim(engine)
	}
}
