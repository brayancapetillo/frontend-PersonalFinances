// - Angular Imports
import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
import { EChartsOption, SeriesOption } from 'echarts'
import { BarChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'

// - Interface's Imports
import { dataArea, dataAreaBumpChart } from '@shared/interfaces/components/charts/dataAreaBump'

// - Constant's Imports
import * as themeConstants from '@shared/constants/colors/themeColors'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

@Component({
	selector: 'app-area-bump-chart',
	standalone: true,
	imports: [],
	templateUrl: './area-bump-chart.component.html',
	styleUrl: './area-bump-chart.component.scss'
})
export class AreaBumpChartComponent implements AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('areaBumpChart', { static: true }) areaBumpChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input({ required: true }) optionAreaBumChart!: dataAreaBumpChart

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
	 * Initializes the ECharts instance and sets its configuration.
	 *
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
			LineChart,
			CanvasRenderer,
			UniversalTransition,
			BarChart
		])
		this.myChart = echarts.init(this.areaBumpChart.nativeElement)
		this.updateChart()
	}

	/**
	 * Updates the chart configuration and resizes it.
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
	 * Generates the chart options for the ECharts instance.
	 * Configures the title, tooltip, grid, x-axis, y-axis, and series of the chart.
	 *
	 * @private
	 * @returns {EChartsOption} - The chart options.
	 */
	private optionChart(): EChartsOption {
		return {
			title: {
				left: '0%',
				text: this.optionAreaBumChart.title,
				textStyle: {
					color: this.darkTheme ? themeConstants.myTextColorSecondaryDark : themeConstants.myTextColorSecondary
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				},
				backgroundColor: this.darkTheme ? themeConstants.mySurfaceGroundDark : themeConstants.mySurfaceGround,
				borderColor: this.darkTheme ? themeConstants.mySurfaceGroundDark : themeConstants.mySurfaceGround,
				textStyle: {
					color: themeConstants.myTextColorSecondary
				},
				extraCssText: `box-shadow: ${this.darkTheme ? themeConstants.shadownpDark : themeConstants.shadownp}`
			},
			grid: {
				left: '1%',
				right: '1%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					axisLabel: {
						color: themeConstants.myTextColorSecondary
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: themeConstants.myTextColorSecondary
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
							width: this.darkTheme ? 0 : 0.5
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
		return this.optionAreaBumChart.data.map((item: dataArea) => item.value).pop() ?? ['']
	}

	/**
	 * Generates series data for the chart.
	 *
	 * @private
	 * @returns {SeriesOption[]}
	 */
	private generateSerieChart(): SeriesOption[] {
		return this.optionAreaBumChart.data.map((item: dataArea, index: number) => ({
			name: item.title,
			type: 'line',
			data: item.data,
			smooth: true,
			lineStyle: {
				width: 2
			},
			symbol: 'circle',
			symbolSize: 8,
			color: index % 2 === 0 ? this.colorPerIndex(index + 1) : this.colorPerIndexGray(index + 1),
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: index % 2 === 0 ? this.createLinearGradientBar(index) : this.createLinearGradientBarGray(index),
					global: false
				}
			}
		}))
	}

	/**
	 * Creates a linear gradient color for the bar based on the index.
	 *
	 * @private
	 * @param {number} index - The index of the bar.
	 * @returns {Array<{ offset: number, color: string }>} - The linear gradient color stops.
	 */
	private createLinearGradientBar(index: number) {
		const colorBarOne: string = themeConstants.themeColors[(index + 1) % themeConstants.themeColors.length]

		return [
			{ offset: 0, color: colorBarOne },
			{ offset: 1, color: `${colorBarOne}00` }
		]
	}

	/**
	 * Gets the color for the given index from the theme colors.
	 *
	 * @private
	 * @param {number} index - The index to get the color for.
	 * @returns {string} - The color for the given index.
	 */
	private colorPerIndex(index: number): string {
		return themeConstants.themeColors[(index + 1) % themeConstants.themeColors.length]
	}

	/**
	 * Creates a linear gradient color for the gray bar based on the index.
	 *
	 * @private
	 * @param {number} index - The index of the gray bar.
	 * @returns {Array<{ offset: number, color: string }>} - The linear gradient color stops.
	 */
	private createLinearGradientBarGray(index: number) {
		const colorBarOne: string = themeConstants.themeColorsGrayScale[(index + 1) % themeConstants.themeColorsGrayScale.length]

		return [
			{ offset: 0, color: colorBarOne },
			{ offset: 1, color: `${colorBarOne}00` }
		]
	}

	/**
	 * Gets the gray color for the given index from the theme gray scale colors.
	 *
	 * @private
	 * @param {number} index - The index to get the gray color for.
	 * @returns {string} - The gray color for the given index.
	 */
	private colorPerIndexGray(index: number): string {
		return themeConstants.themeColorsGrayScale[(index + 1) % themeConstants.themeColorsGrayScale.length]
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
