import { IconDefinition } from '@fortawesome/angular-fontawesome'

export interface dataSimpleGauge {
	icon: IconDefinition
	maxvalue: number
	value: number
	color?: colorsChart
}

export type colorsChart = '#0bd18a' | '#2fbcfb' | '#9243f4' | '#f6c234' | '#8a92a6' | '#ff8787'
