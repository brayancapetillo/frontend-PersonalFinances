import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { dataAccountCard } from '@shared/interfaces/dtos/account/dataAccountCard'

@Component({
	selector: 'app-credit-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './credit-card.component.html',
	styleUrl: './credit-card.component.scss'
})
export class CreditCardComponent {
	@Input({ required: true }) dataAccountCard!: dataAccountCard

	public getImageBank(): string {
		return `/assets/images/creditCard/${this.dataAccountCard.AccountDetails.image ?? 'cash.png'}`
	}

	public getImageCardIssuer(): string {
		return `/assets/images/creditCard/${this.dataAccountCard.AccountDetails.imageCardIssuer ?? 'cashLogo.png'}`
	}
}
