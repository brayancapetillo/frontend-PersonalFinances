// -Core Angular imports
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'

// -Particle Engine imports
import { Engine, ParticlesOptions, RecursivePartial } from '@tsparticles/engine'
import { particlesOptionsConfig } from '@assets/animations/particles/particles'
import { NgxParticlesModule } from '@tsparticles/angular'
import { loadSlim } from '@tsparticles/slim'

// -PrimeNG UI components imports
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'

// -FontAwesome imports
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'

// -Custom components and shared modules imports
import { SwitchModeComponent } from '@shared/components/layout/switch-mode/switch-mode.component'
import { CheckboxComponent } from '@shared/components/input/checkbox/checkbox.component'
import { Model3dComponent } from '@shared/components/models/model3d/model3d.component'

// -Validators imports
import { passwordValidator } from '@shared/validators/forms/passwordValidator'

// -Interface's and dto's imports
import { userSummaryDTO } from '@shared/interfaces/dtos/user/userSummary.dto'
import { tokenSummary } from '@shared/interfaces/dtos/auth/tokenSumary.dto'
import { successResponse } from '@shared/interfaces/api/successResponse'
import { signInDTO } from '@shared/interfaces/dtos/auth/signIn.dto'
import { signUpDTO } from '@shared/interfaces/dtos/auth/signUp.dto'

// -Service's imports
import { ErrorHandlerService } from '@core/services/api/http/error/error-handler.service'
import { ValidateFormService } from '@shared/services/forms/validate-form.service'
import { UserService } from '@core/services/auth/user/user.service'
import { AuthService } from '@core/services/api/auth/auth.service'

/**
 * LoginComponent - A component that allows users to sign in or register.
 * It includes particle animations, FontAwesome integration, and PrimeNG modules.
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
export class LoginComponent {
	//+============= SERVICES =============+\\
	private readonly errorHandleService: ErrorHandlerService = inject(ErrorHandlerService)
	private readonly validateForm: ValidateFormService = inject(ValidateFormService)
	private readonly libraryIcons: FaIconLibrary = inject(FaIconLibrary)
	private readonly authService: AuthService = inject(AuthService)
	private readonly formBuilder: FormBuilder = inject(FormBuilder)
	private readonly userService: UserService = inject(UserService)
	private readonly router: Router = inject(Router)

	//+============== GLOBAL ==============+\\
	public particlesOptions: RecursivePartial<ParticlesOptions> = particlesOptionsConfig
	public isLogin = false

	//+============== FORMS ===============+\\
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
	 */
	constructor() {
		this.libraryIcons.addIcons(faUser, faLock, faFacebook, faGoogle, faGithub, faEnvelope)
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
	 * @public
	 * @returns {void}
	 */
	public changeForm(): void {
		this.isLogin = !this.isLogin
	}

	//&============ FUNCTIONS FOR LOGIN ============&\\
	/**
	 * Handles the user login process.
	 * Validates the form and registers the user if valid.
	 * @public
	 * @returns {Promise<void>} A promise that resolves once the login process completes.
	 */
	public async login(): Promise<void> {
		if (this.formLogin.invalid) {
			this.validateLoginForm()
			return
		}

		const { email, password } = this.formLogin.controls
		const loginData: signInDTO = {
			email: email.value,
			password: password.value
		}

		try {
			const resSignIn: successResponse<tokenSummary> = await firstValueFrom(this.authService.signIn(loginData))

			if (resSignIn.success) {
				const tokens: tokenSummary = resSignIn.data
				await this.userService.setUserByToken(tokens)

				this.router.navigate(['/dashboard'])
			}
		} catch (error: unknown) {
			this.errorHandleService.errorHandleHttp('warn', error, 'signIn')
		}
	}

	/**
	 * Validates the controls of the login form.
	 * @private
	 * @returns {void}
	 */
	private validateLoginForm(): void {
		this.validateForm.notifyErrorFormControl('error', this.formLogin.controls.email, 'email')
		this.validateForm.notifyErrorFormControl('error', this.formLogin.controls.password, 'password')
	}

	//&============ FUNCTIONS FOR REGISTER ============&\\
	/**
	 * Handles the user registration process.
	 * Validates the form and registers the user if valid.
	 * @public
	 * @returns {Promise<void>} A promise that resolves once the registration process completes.
	 */
	public async register(): Promise<void> {
		if (this.formRegister.invalid) {
			this.validateRegisterForm()
			return
		}

		const { userName, email, password } = this.formRegister.controls
		const registerData: signUpDTO = {
			name: userName.value,
			email: email.value,
			password: password.value,
			birthday: null,
			idLenguage: 1,
			idSex: 1,
			lastName: null,
			phone: null
		}

		try {
			const resSignUp: successResponse<userSummaryDTO> = await firstValueFrom(this.authService.signUp(registerData))

			if (resSignUp.success) {
				this.router.navigate(['auth/verifyEmail'], { queryParams: { email: email.value } })
			}
		} catch (error: unknown) {
			this.errorHandleService.errorHandleHttp('warn', error, 'signUp')
		}
	}

	/**
	 * Validates the controls of the registration form.
	 * @private
	 */
	private validateRegisterForm(): void {
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.userName, 'userName')
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.email, 'email')
		this.validateForm.notifyErrorFormControl('error', this.formRegister.controls.password, 'password')
	}
}
