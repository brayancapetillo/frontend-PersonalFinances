// - Angular Imports
import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { TooltipComponent, GridComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { LineChart, BarChart, PictorialBarChart } from 'echarts/charts'
import { EChartsCoreOption, SeriesOption } from 'echarts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'

// - Interface's Imports
import { dataDottedChart } from '@shared/interfaces/components/charts/dataDottedChart'

// - Constant's Imports
import * as themeConstants from '@shared/constants/colors/themeColors'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

@Component({
	selector: 'app-dotted-bar-chart',
	standalone: true,
	imports: [],
	templateUrl: './dotted-bar-chart.component.html',
	styleUrl: './dotted-bar-chart.component.scss'
})
export class DottedBarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('dottedBarChart', { static: true }) dottedBarChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input({ required: true }) optionChartDotted!: dataDottedChart

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
	 * Initializes the theme subscription.
	 */
	constructor() {
		this.initializeThemeSubscription()
	}

	/**
	 * Angular lifecycle hook after the view has been initialized.
	 * Sets up the resize observer for the chart container.
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
	 * Initializes the ECharts instance and sets its configuration.
	 * @private
	 * @returns {void}
	 */
	private initializeChart(): void {
		echarts.use([
			TitleComponent,
			TooltipComponent,
			GridComponent,
			LegendComponent,
			LineChart,
			BarChart,
			PictorialBarChart,
			CanvasRenderer,
			UniversalTransition
		])
		this.myChart = echarts.init(this.dottedBarChart.nativeElement)
		this.updateChart()
	}

	/**
	 * Updates the chart configuration and resizes it.
	 * @private
	 * @returns {void}
	 */
	private updateChart(): void {
		if (this.myChart) {
			this.myChart.setOption(this.optionChart())
		}
	}

	/**
	 * Returns the configuration options for the chart.
	 * @private
	 * @returns {EChartsCoreOption}
	 */
	private optionChart(): EChartsCoreOption {
		const textColor: string = this.darkTheme ? themeConstants.myTextColorSecondaryDark : themeConstants.myTextColorSecondary
		const backgroundColor: string = this.darkTheme ? themeConstants.mySurfaceGroundDark : themeConstants.mySurfaceGround
		const textColorSecundary: string = themeConstants.myTextColorSecondary

		return {
			title: {
				text: this.optionChartDotted.title,
				textStyle: {
					color: textColor
				}
			},
			tooltip: {
				trigger: 'axis',
				backgroundColor: backgroundColor,
				borderColor: backgroundColor,
				textStyle: {
					color: textColorSecundary
				},
				extraCssText: `box-shadow: ${this.darkTheme ? themeConstants.shadownpDark : themeConstants.shadownp}`
			},
			legend: {
				show: this.optionChartDotted.showLegend,
				textStyle: {
					color: textColor
				},
				data: [this.optionChartDotted.data.barSerie.title, this.optionChartDotted.data.lineSerie.title]
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					color: textColorSecundary
				},
				data: this.optionChartDotted.data.labels
			},
			yAxis: {
				axisLabel: {
					color: textColorSecundary
				},
				splitLine: { show: false }
			},
			grid: {
				bottom: '10%',
				left: '5%',
				right: '5%'
			},
			series: [this.createSeriesLine(), this.createSeriesBar(), this.createOverlayBar(), this.createPictorialBar()]
		}
	}

	/**
	 * Creates a series configuration for a line chart.
	 * @private
	 * @returns {SeriesOption}
	 */
	private createSeriesLine(): SeriesOption {
		return {
			name: this.optionChartDotted.data.lineSerie.title,
			type: 'line',
			smooth: true,
			showAllSymbol: true,
			symbol: 'emptyCircle',
			symbolSize: 10,
			itemStyle: { color: this.darkTheme ? themeConstants.myTextColorSecondaryDark : themeConstants.myTextColorSecondary },
			data: this.optionChartDotted.data.lineSerie.data
		}
	}

	/**
	 * Creates a series configuration for a bar chart.
	 * @private
	 * @returns {SeriesOption}
	 */
	private createSeriesBar(): SeriesOption {
		return {
			name: this.optionChartDotted.data.barSerie.title,
			type: 'bar',
			barWidth: 10,
			itemStyle: {
				borderRadius: 5,
				color: this.createLinearGradientGray(4)
			},
			data: this.optionChartDotted.data.barSerie.data
		}
	}

	/**
	 * Creates a series configuration for an overlay bar chart.
	 * @private
	 * @returns {SeriesOption}
	 */
	private createOverlayBar(): SeriesOption {
		return {
			name: this.optionChartDotted.data.lineSerie.title,
			type: 'bar',
			barGap: '-100%',
			barWidth: 10,
			itemStyle: {
				color: this.darkTheme ? this.createLinearGradientGray(8) : this.createLinearGradientGray(10)
			},
			z: -12,
			data: this.optionChartDotted.data.lineSerie.data
		}
	}

	/**
	 * Creates a series configuration for a pictorial bar chart.
	 * @private
	 * @returns {SeriesOption}
	 */
	private createPictorialBar(): SeriesOption {
		const color = this.darkTheme ? themeConstants.mySurfaceGroundDark : themeConstants.mySurfaceGround
		return {
			name: this.optionChartDotted.data.lineSerie.title,
			type: 'pictorialBar',
			symbol: 'rect',
			itemStyle: { color },
			emphasis: { itemStyle: { color } },
			symbolRepeat: true,
			symbolSize: [12, 4],
			symbolMargin: 1,
			z: -10,
			data: this.optionChartDotted.data.lineSerie.data
		}
	}

	/**
	 * Creates a linear gradient for the bar colors.
	 * The gradient is based on the provided index and cycles through a predefined set of colors.
	 *
	 * @private
	 * @param {number} index - The index used to determine the gradient colors.
	 * @returns {echarts.graphic.LinearGradient} A linear gradient configuration for the bar.
	 */
	private createLinearGradientGray(index: number): echarts.graphic.LinearGradient {
		const colorBarOne: string = themeConstants.themeColorsGrayScale[(index + 2) % themeConstants.themeColorsGrayScale.length]
		const colorBarOneSub: string = themeConstants.themeColorsGrayScale[(index + 1) % themeConstants.themeColorsGrayScale.length]

		return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
			{ offset: 0, color: colorBarOne },
			{ offset: 0.7, color: colorBarOne },
			{ offset: 1, color: colorBarOneSub }
		])
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
