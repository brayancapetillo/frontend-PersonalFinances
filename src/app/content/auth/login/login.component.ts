// -Core Angular imports
import { ReactiveFormsModule } from '@angular/forms'
import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

// -Particle Engine imports
import { particlesOptionsConfig } from '../../../../assets/animations/particles/particles'
import { Engine, ParticlesOptions, RecursivePartial } from '@tsparticles/engine'
import { NgxParticlesModule } from '@tsparticles/angular'
import { loadSlim } from '@tsparticles/slim'

// -Custom components and shared modules imports
import { SwitchModeComponent } from '../../../shared/components/layout/switch-mode/switch-mode.component'
import { CheckboxComponent } from '../../../shared/components/input/checkbox/checkbox.component'
import { Model3dComponent } from '../../../shared/components/models/model3d/model3d.component'
import { passwordValidator } from '../../../shared/validators/forms/passwordValidator'

// -PrimeNG UI components imports
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'

// -Interface's imports
import { ErrorMessages } from '../../../shared/types/forms/errorControl'

// -FontAwesome imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { FormBuilder, Validators } from '@angular/forms'

// -Service's imports
import { ToastMessageService } from '../../../core/services/messageService/toast-message.service'
import { ValidateFormService } from '../../../core/services/forms/validate-form.service'

/**
 * LoginComponent - Login component that allows users to sign in with particle animation
 * and offers integration with FontAwesome icons and PrimeNG modules.
 */
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxParticlesModule,
		SwitchModeComponent,
		CheckboxComponent,
		Model3dComponent,
		InputTextModule,
		PasswordModule,
		ToastModule,
		FontAwesomeModule
	],
	providers: [],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	//+============= SERVICES =============+\\
	private readonly validateForm: ValidateFormService = inject(ValidateFormService)
	private readonly messagePNG: ToastMessageService = inject(ToastMessageService)
	private readonly formBuilder: FormBuilder = inject(FormBuilder)
	public libraryIcons: FaIconLibrary = inject(FaIconLibrary)

	//+============== GLOBAL ==============+\\
	public particlesOptions: RecursivePartial<ParticlesOptions> = particlesOptionsConfig
	public isLogin = false

	//+============== FORMS ===============+\\
	public errorMessages: ErrorMessages = this.validateForm.errorMessage
	public formLogin = this.formBuilder.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, passwordValidator]]
	})
	public formRegister = this.formBuilder.nonNullable.group({
		userName: ['', [Validators.required, Validators.minLength(8)]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, passwordValidator]]
	})

	/**
	 * Constructor for the component that registers necessary icons in the FontAwesome library.
	 *
	 * @param library - Instance of FaIconLibrary to add icons used in the component.
	 */
	constructor() {
		this.libraryIcons.addIcons(faUser, faLock, faFacebook, faGoogle, faGithub, faEnvelope)
	}

	/**
	 * Angular lifecycle method that runs after the component is initialized.
	 */
	ngOnInit(): void {
		this.isLogin
	}

	/**
	 * Initializes the particle engine with a lightweight configuration.
	 *
	 * @param {Engine} engine - Particle engine provided by `@tsparticles/engine`.
	 * @returns A promise that resolves once particle configuration is loaded.
	 */
	async particlesInit(engine: Engine): Promise<void> {
		await loadSlim(engine)
	}

	/**
	 * Toggles the `isLogin` value to switch between login and registration forms.
	 */
	public changeForm(): void {
		this.isLogin = !this.isLogin
	}

	//&============ FUNCTIONS FOR LOGIN ============&\\
	public login(): void {
		if (this.formLogin.invalid) {
			this.validateLoginForm()
			return
		}
	}

	private validateLoginForm(): void {
		this.validateForm.notifyErrorFormControl('error', this.formLogin.controls.email, this.errorMessages.email)
		this.validateForm.notifyErrorFormControl('error', this.formLogin.controls.password, this.errorMessages.password)
	}

	//&============ FUNCTIONS FOR REGISTER ============&\\
	public register(): void {
		if (this.formRegister.invalid) {
			this.validateRegisterForm()
			return
		}
	}

	public validateRegisterForm(): void {
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.userName, this.errorMessages.userName)
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.email, this.errorMessages.email)
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.password, this.errorMessages.password)
	}
}
