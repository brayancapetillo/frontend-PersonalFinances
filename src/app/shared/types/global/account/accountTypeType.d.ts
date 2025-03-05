import { tBank } from '../bank/bank'

// Types for Bank Images
export type imageBank = 'bbva.png' | 'nu.png' | 'rappi.png' | 'cash.png'

// Types for Card Issuer Images
export type imagecardIssuer = 'visa.png' | 'mastercard.png' | 'cashLogo.png'

// Card Issuer Enum
export enum cardIssuer {
	visa = 1,
	mastercard = 2,
	cash = 3
}

// Interface for Account Details
export interface AccountDetails {
	id: number
	name: tBank
	image: imageBank
	cardIssuer: cardIssuer
	imageCardIssuer: imagecardIssuer
	directionLeft: boolean
}

// Array of Account Type Details
export const AccountTypeDetails: AccountDetails[] = [
	{ id: 1, name: 'BBVA Bancomer', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 2, name: 'Citibanamex', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 3, name: 'Santander México', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 4, name: 'HSBC México', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 5, name: 'Banorte', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 6, name: 'Scotiabank', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 7, name: 'Inbursa', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 8, name: 'Banco Azteca', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 9, name: 'Banco del Bajío (BanBajío)', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 10, name: 'Banregio', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 11, name: 'Banco Multiva', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 12, name: 'Afirme', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 13, name: 'Intercam Banco', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 14, name: 'BanCoppel', image: 'bbva.png', directionLeft: true, cardIssuer: 1, imageCardIssuer: 'visa.png' },
	{ id: 15, name: 'Nu', image: 'nu.png', directionLeft: true, cardIssuer: 2, imageCardIssuer: 'mastercard.png' },
	{ id: 16, name: 'RappiCard', image: 'rappi.png', directionLeft: false, cardIssuer: 2, imageCardIssuer: 'visa.png' },
	{ id: 17, name: 'Efectivo', image: 'cash.png', directionLeft: false, cardIssuer: 3, imageCardIssuer: 'cashLogo.png' }
] as const
