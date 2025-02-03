// - Angular Imports
import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { CalendarComponent, GridComponent, TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CalendarComponentOption, EChartsCoreOption, TooltipComponentOption, VisualMapComponentOption } from 'echarts'
import { CallbackDataParams, TopLevelFormatterParams } from 'echarts/types/dist/shared'
import { HeatmapSeriesOption } from 'echarts/lib/echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import * as echarts from 'echarts/core'

// - Constant's Imports
import * as themeColors from '@shared/constants/colors/themeColors'

// - Interface's Imports
import { dataHeatMapChart } from '@shared/interfaces/components/charts/dataHeatMapChart'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

/**
 * Component for displaying a heatmap chart using ECharts.
 *
 * This component visualizes data in a heatmap format based on a provided dataset.
 * It supports dynamic theme updates and responsive resizing.
 *
 * @example
 * <app-heat-map [optionChartHeatMap]="data"></app-heat-map>
 */
@Component({
	selector: 'app-heat-map',
	standalone: true,
	imports: [],
	templateUrl: './heat-map.component.html',
	styleUrl: './heat-map.component.scss'
})
export class HeatMapComponent implements AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('heatMapChart', { static: true }) heatMapChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input({ required: true }) optionChartHeatMap!: dataHeatMapChart[]

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
		echarts.use([TitleComponent, GridComponent, CalendarComponent, TooltipComponent, VisualMapComponent, HeatmapChart, CanvasRenderer])
		this.myChart = echarts.init(this.heatMapChart.nativeElement)
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
		const textColor: string = this.darkTheme ? themeColors.myTextColorSecondaryDark : themeColors.myTextColorSecondary
		const backgroundColor: string = this.darkTheme ? themeColors.mySurfaceGroundDark : themeColors.mySurfaceGround
		const textColorSecundary: string = themeColors.myTextColorSecondary

		return {
			tooltip: this.getTooltipConfig(textColorSecundary, backgroundColor),
			visualMap: this.getVisualMapConfig(textColor),
			calendar: this.getCalendarConfig(textColor, backgroundColor),
			series: this.getSeriesConfig()
		}
	}

	/**
	 * Returns the tooltip configuration for the chart.
	 *
	 * @private
	 * @param {string} textColorSecundary - Secondary text color.
	 * @param {string} backgroundColor - Background color of the tooltip.
	 * @returns {TooltipComponentOption} Tooltip configuration.
	 */
	private getTooltipConfig(textColorSecundary: string, backgroundColor: string): TooltipComponentOption {
		return {
			trigger: 'item',
			formatter: (params: TopLevelFormatterParams): string => {
				const data = (params as CallbackDataParams[])[0].data as [string, string]
				const date = data[0]
				const value = data[1]
				const color = (params as CallbackDataParams[])[0].color

				return `
					<div class="flex flex-col rounded-md border-0">
						<div class="font-semibold text-base-color dark:text-base-color-secundary">${date}</div>
						<div class="mt-1 flex gap-2 items-center">
							<div class="h-4 w-4 rounded shadow-np-input-sm" style="background-color: ${color};"></div>
							<div class="text-base-color-secundary">${value}</div>
						</div>
					</div>
				`
			},
			backgroundColor: backgroundColor,
			borderColor: backgroundColor,
			textStyle: {
				color: textColorSecundary
			},
			extraCssText: `box-shadow: ${this.darkTheme ? themeColors.shadownpDark : themeColors.shadownp}`
		}
	}

	/**
	 * Returns the visual map configuration for the chart.
	 *
	 * @private
	 * @param {string} textColor - Text color used for visual map.
	 * @returns {VisualMapComponentOption} Visual map configuration.
	 */
	private getVisualMapConfig(textColor: string): VisualMapComponentOption {
		return {
			min: 0,
			max: this.maxValue(),
			type: 'piecewise',
			orient: 'horizontal',
			left: 'center',
			top: 0,
			inRange: {
				color: this.getColorRange()
			},
			textStyle: {
				color: textColor
			}
		}
	}

	/**
	 * Returns the calendar configuration for the chart.
	 *
	 * @private
	 * @param {string} textColor - Text color used for day labels.
	 * @param {string} backgroundColor - Background color of the calendar.
	 * @returns {CalendarComponentOption} Calendar configuration.
	 */
	private getCalendarConfig(textColor: string, backgroundColor: string): CalendarComponentOption {
		return {
			cellSize: [20, 20],
			range: this.getRangeCalendar(),
			itemStyle: {
				borderWidth: 4,
				borderColor: backgroundColor,
				color: backgroundColor
			},
			yearLabel: {
				show: false
			},
			splitLine: {
				show: false
			},
			monthLabel: {
				color: this.darkTheme ? themeColors.myTextColorDark : themeColors.myTextColor
			},
			dayLabel: {
				color: textColor
			},
			top: 80,
			left: 25,
			right: 25
		}
	}

	/**
	 * Configures and returns the series options for the heatmap chart.
	 * Maps the provided data to the required format and applies styling based on the theme.
	 *
	 * @private
	 * @returns {HeatmapSeriesOption} Configuration options for the heatmap series.
	 */
	private getSeriesConfig(): HeatmapSeriesOption {
		return {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: this.optionChartHeatMap.map((item: dataHeatMapChart) => [item.date, item.value]),
			itemStyle: {
				borderRadius: 4,
				borderColor: this.darkTheme ? themeColors.shadowColorInsetDark : themeColors.shadowColorInset,
				borderWidth: 0.5,
				shadowBlur: 4,
				shadowColor: 'rgba(0, 0, 0, 0)'
			},
			emphasis: {
				itemStyle: {
					color: this.darkTheme ? themeColors.myHighlightTextColor : 'none',
					shadowBlur: 4,
					shadowColor: themeColors.myHighlightTextColor
				}
			}
		}
	}

	/**
	 * Calculates and returns the maximum value from the heatmap data.
	 *
	 * @private
	 * @returns {number} Maximum value in the dataset.
	 */
	private maxValue(): number {
		return Math.max(...this.optionChartHeatMap.map((item) => item.value))
	}

	/**
	 * Determines the date range for the heatmap calendar based on available data.
	 * If no data is present, returns the current date for both start and end.
	 *
	 * @private
	 * @returns {[Date, Date]} Start and end dates for the calendar range.
	 */
	private getRangeCalendar(): [Date, Date] {
		if (!this.optionChartHeatMap.length) return [new Date(), new Date()]

		const dates = this.optionChartHeatMap.map((item) => new Date(item.date)).sort((a, b) => a.getTime() - b.getTime())

		return [dates[0] || new Date(), dates[dates.length - 1] || new Date()]
	}

	/**
	 * Generates the color range for the heatmap based on the current theme.
	 * Uses a grayscale palette, adjusting for light and dark themes.
	 *
	 * @private
	 * @returns {string[]} Array of color values for the heatmap.
	 */
	private getColorRange(): string[] {
		return this.darkTheme
			? themeColors.themeColorsGrayScale.slice(themeColors.themeColorsGrayScale.length / 2, themeColors.themeColorsGrayScale.length).reverse()
			: themeColors.themeColorsGrayScale.slice(0, themeColors.themeColorsGrayScale.length / 2)
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
