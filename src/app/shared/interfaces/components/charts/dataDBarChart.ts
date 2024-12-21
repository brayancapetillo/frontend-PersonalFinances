export interface dataBar {
	title: string
	value: string[]
	data: number[]
}

export interface dataDBarChart {
	title: string
	showLegend: boolean
	data: dataBar[]
}
