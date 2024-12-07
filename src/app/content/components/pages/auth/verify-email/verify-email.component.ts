// -Core Angular imports
import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

// -Custom components and shared modules imports
import { InformationCardComponent } from '@shared/components/messages/information/information-card/information-card.component'
import { IinformationCard } from '@shared/interfaces/components/messages/informationCard'

/**
 * Component responsible for handling email verification.
 * Displays an informational card and dynamically updates its description
 * based on query parameters provided in the URL.
 */
@Component({
	selector: 'app-verify-email',
	standalone: true,
	imports: [InformationCardComponent],
	templateUrl: './verify-email.component.html',
	styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
	//+============= SERVICES =============+\\
	private readonly route: ActivatedRoute = inject(ActivatedRoute)

	//+============== GLOBAL ==============+\\
	public information: IinformationCard = {
		title: 'Verificación de Correo Electrónico',
		subtitle: '',
		description:
			'¡Todo está casi listo! Hemos enviado un correo electrónico de verificación a la dirección a. Es necesario que confirmes tu correo para poder acceder a tus finanzas personales.',
		img: 'mail.png',
		textButton: 'Iniciar sesión',
		link: '/auth/login'
	}

	/**
	 * Lifecycle method that executes when the component is initialized.
	 * Subscribes to changes in the URL query parameters and updates the card's
	 * information based on the received email address.
	 */
	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params) {
				const email: string = params['email']
				this.updateInformation(email)
			}
		})
	}

	/**
	 * Updates the card's description with an encoded email address.
	 *
	 * @private
	 * @param {string} email - The email address extracted from the query parameters.
	 * @returns {void}
	 */
	private updateInformation(email: string): void {
		const codifyEmail: string = this.codifyEmail(email)
		this.information = {
			...this.information,
			description: `¡Todo está casi listo! Hemos enviado un correo electrónico de verificación a la dirección ${codifyEmail}. Es necesario que confirmes tu correo para poder acceder a tus finanzas personales.`
		}
	}

	/**
	 * Encodes the provided email address by partially masking the personal identifier.
	 *
	 * @private
	 * @param {string} email - The email address to encode.
	 * @returns The encoded email address, where a portion of the personal identifier
	 * is replaced with `⋄` characters.
	 */
	private codifyEmail(email: string): string {
		if (!email.includes('@')) {
			return email
		}

		const [personalEmail, domain] = email.split('@')
		if (!personalEmail || !domain) {
			return email
		}

		const visiblePartLength = Math.floor(personalEmail.length / 3)
		const maskedPart = '⋄'.repeat(personalEmail.length - visiblePartLength)

		return personalEmail.slice(0, visiblePartLength) + maskedPart + '@' + domain
	}
}
