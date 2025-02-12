// - Angular Imports
import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnChanges, OnDestroy, Input } from '@angular/core'
import { Subscription } from 'rxjs'

// - Echart's Imports
import { CanvasRenderer } from 'echarts/renderers'
import { EChartsCoreOption } from 'echarts'
import { GaugeChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import { SeriesOption } from 'echarts'

// - Interface's Imports
import { dataSimpleGauge } from '@shared/interfaces/components/charts/simpleGaugeChart'

// -FontAwesome imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// - Constant's Imports
import * as themeColors from '@shared/constants/colors/themeColors'

// - Service's Imports
import { ThemeService } from '@core/services/auth/theme/theme.service'

@Component({
	selector: 'app-simple-gauge-chart',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './simple-gauge-chart.component.html',
	styleUrl: './simple-gauge-chart.component.scss'
})
export class SimpleGaugeChartComponent implements AfterViewInit, OnChanges, OnDestroy {
	//+==================== REFERENCES ====================+\\
	@ViewChild('containerChart', { static: true }) containerChart!: ElementRef
	@ViewChild('SimpleGaugeChart', { static: true }) SimpleGaugeChart!: ElementRef

	//+====================== INPUT ======================+\\
	@Input({ required: true }) dataSimpleGauge!: dataSimpleGauge

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
	 * @private
	 * @returns {void}
	 */
	private initializeChart(): void {
		echarts.use([GaugeChart, CanvasRenderer])
		this.myChart = echarts.init(this.SimpleGaugeChart.nativeElement)
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
	 *
	 * @private
	 * @returns {EChartsCoreOption} The configuration options for the chart.
	 */
	private optionChart(): EChartsCoreOption {
		return {
			series: [this.serieMiddleCircle(), this.serieProgressGauge()]
		}
	}

	/**
	 * Returns configuration for the middle circle of the gauge.
	 *
	 * @private
	 * @returns {SeriesOption} Series option for the middle circle.
	 */
	private serieMiddleCircle(): SeriesOption {
		return {
			type: 'gauge',
			startAngle: 0,
			endAngle: 360,
			radius: '60%',
			axisLine: {
				lineStyle: {
					width: 1000,
					color: [[10, this.darkTheme ? themeColors.mySurfaceGroundDark : themeColors.mySurfaceGround]],
					shadowColor: this.darkTheme ? themeColors.shadowColorDark : themeColors.shadowColor,
					shadowBlur: 16,
					shadowOffsetX: 0,
					shadowOffsetY: 0
				}
			},
			pointer: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			},
			detail: {
				show: false
			}
		}
	}

	/**
	 * Returns configuration for the progress gauge.
	 *
	 * @private
	 * @returns {SeriesOption} Series option for the progress gauge.
	 */
	private serieProgressGauge(): SeriesOption {
		return {
			type: 'gauge',
			startAngle: -40,
			endAngle: 320,
			radius: '85%',
			max: this.dataSimpleGauge.maxvalue,
			name: 'Perfect',
			itemStyle: {
				color: this.dataSimpleGauge.color
			},
			progress: {
				show: true,
				roundCap: true,
				width: 22
			},
			pointer: {
				show: false
			},
			axisLine: {
				roundCap: true,
				lineStyle: {
					width: 22,
					color: [[1, this.darkTheme ? '#161616' : '#e0e7f7']],
					shadowColor: this.darkTheme ? themeColors.shadowColorInsetDark : themeColors.shadowColorInset,
					shadowBlur: 16,
					shadowOffsetX: 10,
					shadowOffsetY: 10
				}
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			},
			title: {
				offsetCenter: ['0%', '0%']
			},
			detail: {
				show: false,
				valueAnimation: true,
				offsetCenter: ['0%', '10%'],
				formatter: '{value}',
				fontSize: 20,
				width: 50,
				height: 14,
				color: 'inherit',
				borderColor: 'inherit',
				borderRadius: 20,
				borderWidth: 1
			},
			data: [
				{
					value: this.dataSimpleGauge.value
				}
			]
		}
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
