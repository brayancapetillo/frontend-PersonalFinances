import { ilustrationName } from '@shared/types/assets/images/ilustation'

export interface IinformationCard {
	img: ilustrationName
	title: string
	subtitle?: string
	description: string
	textButton: string
	link: string
}
