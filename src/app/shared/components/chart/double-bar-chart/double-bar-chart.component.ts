// - Angular Imports
import { Component, ElementRef, inject, ViewChild, OnDestroy, AfterViewInit, OnInit, Input, OnChanges } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { EChartsCoreOption, SeriesOption } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	MarkLineComponent,
	MarkPointComponent
} from 'echarts/components'

// - Interface's Imports
import { dataBar, dataDBarChart } from '@shared/interfaces/components/charts/dataDBarChart'

// - Constant's Imports
import {
	myHighlightTextColor,
	mySurfaceGround,
	mySurfaceGroundDark,
	myTextColorSecondary,
	shadownp,
	shadownpDark,
	themeColors
} from '@shared/constants/colors/themeColors'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

/**
 * Component for rendering a double bar chart using ECharts.
 *
 * This component is responsible for initializing, updating, and managing a customizable bar chart.
 * It supports dark mode and dynamically updates based on input data and theme changes.
 *
 * @component
 * @example
 * <app-double-bar-chart [optionChartBar]="chartData"></app-double-bar-chart>
 */
@Component({
	selector: 'app-double-bar-chart',
	standalone: true,
	imports: [],
	templateUrl: './double-bar-chart.component.html',
	styleUrl: './double-bar-chart.component.scss'
})
export class DoubleBarChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('doubleBarChart', { static: true }) doubleBarChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input() optionChartBar: dataDBarChart = {
		title: '',
		showLegend: false,
		data: []
	}

	//+===================== SERVICES =====================+\\
	private readonly themeService: ThemeService = inject(ThemeService)

	//+====================== CHARTS ======================+\\
	private myChart!: echarts.EChartsType

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
	 * Angular lifecycle hook for component initialization.
	 * Sets up the chart.
	 * @public
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.initializeChart()
	}

	/**
	 * Angular lifecycle hook after the view has been initialized.
	 * Sets up the resize observer for the chart container.
	 * @public
	 * @returns {void}
	 */
	public ngAfterViewInit(): void {
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
			ToolboxComponent,
			TooltipComponent,
			GridComponent,
			LegendComponent,
			MarkLineComponent,
			MarkPointComponent,
			BarChart,
			CanvasRenderer
		])
		this.myChart = echarts.init(this.doubleBarChart.nativeElement)
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
			this.resizeChart()
		}
	}

	/**
	 * Returns the configuration options for the chart.
	 * @private
	 * @returns {EChartsCoreOption}
	 */
	private optionChart(): EChartsCoreOption {
		return {
			title: {
				text: this.optionChartBar.title,
				textStyle: {
					color: myHighlightTextColor
				}
			},
			tooltip: {
				trigger: 'axis',
				backgroundColor: this.darkTheme ? mySurfaceGroundDark : mySurfaceGround,
				borderColor: this.darkTheme ? mySurfaceGroundDark : mySurfaceGround,
				textStyle: {
					color: myTextColorSecondary
				},
				extraCssText: `box-shadow: ${this.darkTheme ? shadownpDark : shadownp}`
			},
			legend: {
				show: this.optionChartBar.showLegend,
				left: 'right',
				textStyle: {
					color: myTextColorSecondary
				}
			},

			grid: {
				bottom: '10%'
			},
			calculable: true,
			xAxis: [
				{
					type: 'category',
					axisLabel: {
						color: myTextColorSecondary
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: myTextColorSecondary
						}
					},
					data: this.generateXdataChart()
				}
			],
			yAxis: [
				{
					type: 'value',
					splitLine: {
						lineStyle: {
							width: 0.5
						}
					}
				}
			],
			series: this.generateSerieChart()
		}
	}

	/**
	 * Generates data for the x-axis based on the input data.
	 * @private
	 * @returns {string[]}
	 */
	private generateXdataChart(): string[] {
		return this.optionChartBar.data.map((item: dataBar) => item.value).pop() ?? ['']
	}

	/**
	 * Generates series data for the chart.
	 *
	 * @private
	 * @returns {SeriesOption[]}
	 */
	private generateSerieChart(): SeriesOption[] {
		return this.optionChartBar.data.map((item: dataBar, index: number) => ({
			name: item.title,
			type: 'bar',
			itemStyle: {
				color: this.createLinearGradientBar(index),
				borderRadius: [4, 4, 0, 0]
			},
			data: item.data
		}))
	}

	/**
	 * Creates a linear gradient for the bar colors.
	 * The gradient is based on the provided index and cycles through a predefined set of colors.
	 *
	 * @private
	 * @param {number} index - The index used to determine the gradient colors.
	 * @returns {echarts.graphic.LinearGradient} A linear gradient configuration for the bar.
	 */
	private createLinearGradientBar(index: number): echarts.graphic.LinearGradient {
		const colorBarOne: string = themeColors[(index + 1) % themeColors.length]
		const colorBarOneSub: string = themeColors[(index + 2) % themeColors.length]

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
		if (this.myChart) {
			this.myChart.resize()
		}
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
