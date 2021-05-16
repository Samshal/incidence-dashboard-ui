import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { EChartsOption, registerMap } from 'echarts';

import { ServerRequestService } from '../../server-request.service';
import { EventsService } from '../../events.service';

@Component({
	selector: 'app-incidences-by-region-breakdown',
	templateUrl: './incidences-by-region-breakdown.component.html',
	styleUrls: ['./incidences-by-region-breakdown.component.css']
})
export class IncidencesByRegionBreakdownComponent implements OnInit {
	categoriesChart;
	trendsChart;
	globalDateRange = {startDate:"", endDate:""};

	@Input() region: any = "";
	@Input() categoriesData;
	@Input() trendsData;

	regionCategoriesOption: EChartsOption = {
		title: {
			text: "",
			subtext: "",
			left: "center"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		legend:{
			bottom:0,
			data: []
		},
	    xAxis: [
	        {
	            type: 'category',
	            data: [],
	            axisTick: {
	                show: false
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
		series: [],
	};

	regionCasualtiesOption: EChartsOption = {
		tooltip: {
			trigger: "item",
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend:{
			top:10,
			data: ['KIA', 'MIA', 'WIA', 'Civillians Killed', 'Civillians Abducted', 'Criminals Killed', 'Criminals Wounded', 'Suspects Arrested']
		},
		series: [
			{
				name: "Blue Forces",
				type: "pie",
				selectedMode: "single",
				radius: [0, "35%"],
	            label: {
	                position: 'inner',
	                fontSize: 14,
	            },
	            labelLine: {
	                show: false
	            },
				data: [
					{value: 300, name: "KIA"},
					{value: 240, name: "MIA"},
					{value: 87, name: "WIA"}
				]
			},
			{
				name: "Civillians",
				type: "pie",
				radius: ["45%", "65%"],
	            labelLine: {
	                length: 30
	            },
				data: [
					{value: 100, name: "Civillians Killed"},
					{value: 40, name: "Civillians Abducted"}
				]
			},
			{
				name: "Red Forces",
				type: "pie",
				radius: ["70%", "80%"],
	            labelLine: {
	                length: 45
	            },
				data: [
					{value: 10, name: "Criminals Killed"},
					{value: 4, name: "Suspects Arrested"},
					{value: 11, name: "Criminals Wounded"}
				]
			},
		],
	};

	regionTimeSeriesOption: EChartsOption = {
		title: {
			text: "Trend",
		},
		tooltip: {
			trigger: "axis"
		},
		legend:{
			data: []
		},
		grid:{
			left: '3%',
			right: '4%',
			bottom: "3%",
			containLabel: true
		},
	    xAxis: [
	        {
	            type: 'category',
	            data: [],
	            boundaryGap: false
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
		series: [
		],
	};

	constructor(private serverRequest: ServerRequestService, private eventsService: EventsService) {
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges){
		const categoriesData: SimpleChange = changes.categoriesData;
		if (categoriesData.currentValue !== null){
			this.categoriesData = JSON.parse(categoriesData.currentValue);
			this.trendsData = JSON.parse(changes.trendsData.currentValue);
			if (typeof this.categoriesData.data !== "undefined"){
				setTimeout(()=>{
					this.loadCategoriesData();
					this.loadTrendsData();
				}, 500)
			}
		}
	}

	onCategoriesChartInit(instance): any {
		this.categoriesChart = instance;
	}

	onTrendsChartInit(instance): any {
		this.trendsChart = instance;
	}

	loadCategoriesData():void {
		if (typeof this.categoriesData.data != "undefined"){
			let series: any = [];
			for (let key in this.categoriesData.data){
				let val = this.categoriesData.data[key];
				let seriesTpl = {
					name: key,
					type: "bar",
					barGap: 0,
					label: [],
					emphasis: {
						focus: "series"
					},
					data: Object.values(val)
				};
				series.push(seriesTpl);
			}

			this.categoriesChart.setOption({
				legend:{
					bottom:0,
					data: this.categoriesData.legends
				},
				xAxis:{
					data: this.categoriesData.values
				},
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow"
					}
				},
				series:series,
				title:{
					text: this.region+" Incidence Categories",
					subtext:(this.categoriesData.values).length+" States",
					left: "center"
				}
			}, true)
		}
		else {
			this.categoriesChart.clear();
		}
	}

	loadTrendsData():void {
		if (typeof this.trendsData.data != "undefined"){
			let series: any = [];
			for (let key in this.trendsData.data){
				let val = this.trendsData.data[key];
				let seriesTpl = {
					name: key,
					type: "line",
					smooth: true,
					data: Object.values(val)
				};
				series.push(seriesTpl);
			}

			this.trendsChart.setOption({
				title: {
					text: "Trend",
				},
				tooltip: {
					trigger: "axis"
				},
				legend:{
					data: this.trendsData.legends,
					top:20
				},
				grid:{
					left: '3%',
					right: '4%',
					bottom: "3%",
					containLabel: true
				},
			    xAxis: [
			        {
			            type: 'category',
			            data: this.trendsData.values,
			            boundaryGap: false
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
				series:series
			}, true)
		}
		else {
			this.trendsChart.clear();
		}
	}	
}
