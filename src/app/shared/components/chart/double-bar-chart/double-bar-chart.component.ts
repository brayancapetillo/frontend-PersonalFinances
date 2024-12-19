import { Component, ElementRef, inject, ViewChild, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core'
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
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { ThemeService } from '@core/services/auth/theme/theme.service'
import { Subscription } from 'rxjs'
import { myHighlightTextColor, mySurfaceGround, mySurfaceGroundDark, myTextColorSecondary, themeColors } from '@shared/constants/colors/themeColors'
@Component({
	selector: 'app-double-bar-chart',
	standalone: true,
	imports: [],
	templateUrl: './double-bar-chart.component.html',
	styleUrl: './double-bar-chart.component.scss'
})
export class DoubleBarChartComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
	//+===================== SERVICES =====================+\\
	private readonly themeService: ThemeService = inject(ThemeService)

	@ViewChild('doubleBarChart', { static: true }) chartContainer!: ElementRef

	private themeSubscription!: Subscription
	public darkTheme: boolean = false
	private myChart!: echarts.EChartsType
	previousWidth: number = 0
	previousHeight: number = 0
	constructor() {
		this.themeSubscription = this.themeService.darkTheme.subscribe((state: boolean) => {
			this.darkTheme = state
		})
	}

	ngAfterViewChecked(): void {
		if (this.chartContainer) {
			const width = this.chartContainer.nativeElement.offsetWidth
			const height = this.chartContainer.nativeElement.offsetHeight

			if (width !== this.previousWidth || height !== this.previousHeight) {
				// El tamaño ha cambiado
				console.log('El tamaño del contenedor ha cambiado:', width, height)

				// Actualiza los valores previos
				this.previousWidth = width
				this.previousHeight = height

				this.myChart.resize()
			}
		}
	}

	ngAfterViewInit(): void {
		this.initChart()
	}

	private initChart(): void {
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

		this.myChart = echarts.init(this.chartContainer.nativeElement)
		this.updateChart()
	}

	private updateChart(): void {
		if (this.myChart) {
			this.myChart.setOption(this.optionChart())
			this.myChart.resize()
		}
	}

	private optionChart(): echarts.EChartsCoreOption {
		const middlePaletteIndex = 3

		const [colorBarOne, colorBarOneSub, colorBarTwo, colorBarTwoSub] = themeColors.slice(1, middlePaletteIndex + 4)

		const createLinearGradient = (colorStart: string, colorEnd: string) =>
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				{ offset: 0, color: colorStart },
				{ offset: 0.5, color: colorStart },
				{ offset: 1, color: colorEnd }
			])

		return {
			title: {
				text: 'Rainfall vs Evaporation',
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
				}
			},
			legend: {
				left: 'right',
				textStyle: {
					color: myTextColorSecondary
				}
			},
			grid: {
				left: '5%',
				right: '5%',
				top: '15%',
				bottom: '5%'
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
					data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
			series: [
				{
					name: 'Rainfall',
					type: 'bar',
					itemStyle: {
						color: createLinearGradient(colorBarOneSub, colorBarOne),
						borderRadius: [4, 4, 0, 0]
					},
					data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
				},
				{
					name: 'Evaporation',
					type: 'bar',
					itemStyle: {
						color: createLinearGradient(colorBarTwoSub, colorBarTwo),
						borderRadius: [4, 4, 0, 0]
					},
					data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				}
			]
		}
	}

	public ngOnDestroy(): void {
		this.themeSubscription.unsubscribe()
	}
}
