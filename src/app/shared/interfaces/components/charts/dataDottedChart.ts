export interface dataSerieDotted {
	title: string
	data: number[]
}

export interface dataDotted {
	labels: string[]
	barSerie: dataSerieDotted
	lineSerie: dataSerieDotted
}
export interface dataDottedChart {
	title: string
	showLegend: boolean
	data: dataDotted
}
