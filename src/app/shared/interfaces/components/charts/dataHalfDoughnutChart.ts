export enum typeHalfDough {
	expenditure = 1,
	remaining
}
export interface dataChartPie {
	value: number
	name: string
	type: typeHalfDough
}

export interface dataHalfDoughnutChart {
	caracter?: string
	data: [dataChartPie, dataChartPie]
}
