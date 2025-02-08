// - Angular Imports
import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { EChartsCoreOption, PieSeriesOption, SeriesOption } from 'echarts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'
import { PieChart } from 'echarts/charts'
import * as echarts from 'echarts/core'

// - Constant's Imports
import * as themeColors from '@shared/constants/colors/themeColors'

// - Interface's Imports
import { dataChartPie, dataHalfDoughnutChart, typeHalfDough } from '@shared/interfaces/components/charts/dataHalfDoughnutChart'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

/**
 * Component for displaying a half doughnut chart using ECharts.
 *
 * This component visualizes data in a half doughnut chart format based on the provided dataset.
 * It supports dynamic theme updates (light/dark mode) and responsive resizing to fit the container.
 * The chart consists of multiple pie series, each with customizable visual properties based on input data.
 *
 * @example
 * <app-half-doughnut-chart [optionHalfDoughnut]="data"></app-half-doughnut-chart>
 */
@Component({
	selector: 'app-half-doughnut-chart',
	standalone: true,
	imports: [],
	templateUrl: './half-doughnut-chart.component.html',
	styleUrl: './half-doughnut-chart.component.scss'
})
export class HalfDoughnutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('halfDoughnutChart', { static: true }) doubleBarChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input({ required: true }) optionHalfDoughnut!: dataHalfDoughnutChart

	//+===================== SERVICES =====================+\\
	private readonly themeService: ThemeService = inject(ThemeService)

	//+====================== CHARTS ======================+\\
	private myChart!: echarts.EChartsType
	private firstCallResize: boolean = false

	//+====================== GLOBAL ======================+\\
	private themeSubscription!: Subscription
	private resizeContainer!: ResizeObserver
	public darkTheme: boolean = false

	//&====================== LIFE CYCLES ======================&\\
	/**
	 * Initializes the theme subscription to monitor changes in the theme (light/dark).
	 *
	 * @constructor
	 */
	constructor() {
		this.initializeThemeSubscription()
	}

	/**
	 * Angular lifecycle hook executed after the view has been initialized.
	 * Initializes the chart and sets up a resize observer to adjust the chart size.
	 *
	 * @public
	 * @returns {void}
	 */
	public ngAfterViewInit(): void {
		this.initializeChart()
		this.setupResizeObserver()
	}

	/**
	 * Angular lifecycle hook for input changes.
	 * Updates the chart with new data.
	 *
	 * @public
	 * @returns {void}
	 */
	public ngOnChanges(): void {
		this.updateChart()
	}

	/**
	 * Angular lifecycle hook for component destruction.
	 * Unsubscribes from theme changes, disconnects the resize observer, and disposes of the chart instance.
	 *
	 * @public
	 * @returns {void}
	 */
	public ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
		this.resizeContainer?.disconnect()
		this.myChart?.dispose()
	}

	//&=============== CHART INITIALIZATION AND CONFIGURATION ===============&\\
	/**
	 * Initializes the ECharts instance and applies the necessary configuration.
	 *
	 * @private
	 * @returns {void}
	 */
	private initializeChart(): void {
		echarts.use([TooltipComponent, LegendComponent, PieChart, LabelLayout, CanvasRenderer])
		this.myChart = echarts.init(this.doubleBarChart.nativeElement)
		this.updateChart()
	}

	/**
	 * Updates the chart with the latest data.
	 *
	 * @private
	 * @returns {void}
	 */
	private updateChart(): void {
		if (this.myChart) {
			this.myChart.setOption(this.optionChart())
		}
	}

	/**
	 * Constructs and returns the configuration options for the chart.
	 *
	 * @private
	 * @returns {EChartsCoreOption} Configuration options for the chart.
	 */
	private optionChart(): EChartsCoreOption {
		return {
			tooltip: { show: false },
			legend: { show: false },
			series: [this.createFirstPieSeries(), this.createSecondPieSeries(), this.createAccessFromSeries()]
		}
	}

	/**
	 * Creates the first pie series (background).
	 *
	 * @private
	 * @returns {SeriesOption}
	 */
	private createFirstPieSeries(): SeriesOption {
		return {
			type: 'pie',
			radius: ['72%', '97%'],
			center: ['50%', '55%'],
			startAngle: 210,
			labelLine: { show: false },
			endAngle: -30,
			silent: true,
			zlevel: -1,
			itemStyle: {
				borderRadius: 10,
				shadowBlur: 16,
				shadowOffsetX: 10,
				shadowOffsetY: 10,
				shadowColor: this.darkTheme ? themeColors.shadowColorInsetDark : themeColors.shadowColorInset
			},
			data: [{ value: 1 }]
		}
	}

	/**
	 * Creates the second pie series (foreground).
	 *
	 * @private
	 * @returns {SeriesOption}
	 */
	private createSecondPieSeries(): SeriesOption {
		return {
			color: 'red',
			type: 'pie',
			radius: ['72%', '97%'],
			center: ['50%', '55%'],
			startAngle: 210,
			labelLine: { show: false },
			endAngle: -30,
			silent: true,
			zlevel: -1,
			itemStyle: {
				borderRadius: 10,
				shadowBlur: 16,
				shadowOffsetX: -10,
				shadowOffsetY: -10,
				shadowColor: this.darkTheme ? themeColors.shadowColorDark : themeColors.shadowColor
			},
			data: [
				{
					value: 1,
					itemStyle: { color: this.darkTheme ? themeColors.mySurfaceGroundDark : themeColors.mySurfaceGround, borderRadius: [0, 10, 0, 10] }
				}
			]
		}
	}

	/**
	 * Creates the main pie chart series (data).
	 *
	 * @private
	 * @returns {SeriesOption}
	 */
	private createAccessFromSeries(): SeriesOption {
		return {
			name: 'Access From',
			type: 'pie',
			radius: ['70%', '97%'],
			center: ['50%', '55%'],
			startAngle: 210,
			endAngle: -30,
			label: { show: false },
			labelLine: { show: false },
			emphasis: { disabled: true },
			data: this.generateDataPieChart()
		}
	}

	/**
	 * Generates the data for the pie chart based on input.
	 *
	 * @private
	 * @returns {PieSeriesOption[]}
	 */
	private generateDataPieChart(): PieSeriesOption[] {
		return this.optionHalfDoughnut.data.map((item: dataChartPie) => ({
			value: item.value,
			name: item.name,
			itemStyle: {
				color:
					item.type === typeHalfDough.expenditure
						? (themeColors.themeColorsGrayScale[5] ?? '#6c758b')
						: this.darkTheme
							? themeColors.mySurfaceGroundDark
							: themeColors.mySurfaceGround,
				borderRadius: item.type === typeHalfDough.expenditure ? [10, 10, 10, 10] : [0, 10, 0, 10]
			}
		}))
	}

	/**
	 * Resizes the chart to fit its container.
	 * Ensures that the chart responds to changes in container size.
	 *
	 * @private
	 * @returns {void}
	 */
	private resizeChart(): void {
		!this.firstCallResize ? (this.firstCallResize = true) : this.myChart?.resize()
	}

	//&========================= GENERAL COMPONENT =========================&\\
	/**
	 * Calculates the percentage of expenditure in the data.
	 *
	 * @public
	 * @returns {number} The percentage of expenditure data.
	 */
	public ValuePercent(): number {
		const dataExpenditure = this.optionHalfDoughnut.data.find((item: dataChartPie) => item.type === typeHalfDough.expenditure)
		const totalValueData = this.optionHalfDoughnut.data.reduce((sum: number, item: dataChartPie) => sum + item.value, 0)

		if (!dataExpenditure || totalValueData === 0) return 0

		return Math.round((dataExpenditure.value * 100) / totalValueData)
	}

	//&==================== SUSCRIPTION TO THEME SERVICE ====================&\\
	/**
	 * Initializes the subscription to monitor theme changes.
	 * Updates the chart when the theme changes (e.g., light or dark mode).
	 *
	 * @private
	 * @returns {void}
	 */
	private initializeThemeSubscription(): void {
		this.themeSubscription = this.themeService.darkTheme.subscribe((isDark: boolean) => {
			this.darkTheme = isDark
			this.updateChart()
		})
	}

	//&===================== OBSERVER FOR RESIZE CHART ======================&\\
	/**
	 * Sets up a resize observer for the chart container.
	 * Automatically resizes the chart when the container's size changes.
	 *
	 * @private
	 * @returns {void}
	 */
	private setupResizeObserver(): void {
		this.resizeContainer = new ResizeObserver(() => this.resizeChart())
		this.resizeContainer.observe(this.containerChart.nativeElement)
	}
}
