import { Component, Input } from '@angular/core'
import { CardComponent } from '../../../panel/card/card.component'
import { IinformationCard } from '@shared/interfaces/components/messages/informationCard'
import { ilustrationName } from '@shared/types/assets/images/ilustation'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-information-card',
	standalone: true,
	imports: [CardComponent, RouterModule],
	templateUrl: './information-card.component.html',
	styleUrl: './information-card.component.scss'
})
export class InformationCardComponent {
	@Input() information!: IinformationCard

	public getUrlImg(ilustrationName: ilustrationName) {
		return '/assets/images/ilustration/' + ilustrationName
	}
}
