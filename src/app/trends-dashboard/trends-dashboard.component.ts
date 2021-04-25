import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
	selector: 'app-trends-dashboard',
	templateUrl: './trends-dashboard.component.html',
	styleUrls: ['./trends-dashboard.component.css']
})
export class TrendsDashboardComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	incidencesIncidentCategoryOption: EChartsOption = {
		tooltip: {
			formatter: '{a} <br/>{b} : {c}%'
		},
		series: [{
			name: 'Pressure',
			type: 'gauge',
			progress: {
				show: true
			},
			detail: {
				valueAnimation: true,
				formatter: '{value}%'
			},
			data: [{
				value: 50,
				name: 'Armed Banditry'
			}]
		}]
	};

	incidencesCalendarTrendsOption: EChartsOption = {
		visualMap: {
	        show: false,
	        type: 'continuous',
	        seriesIndex: 0,
	        min: 0,
	        max: 400
	    },
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			data: ["2000-06-02", "2000-06-05", "2000-06-07", "2000-06-09"]
		},
		yAxis:{},
		grid:{
			bottom: "60%"
		},
		series: [{
			type: 'line',
			showSymbol: false,
			data: [116, 500, 135, 47]
		}]
	};

	incidencesCalendarHeatmapOption: EChartsOption = {
		title: {},
		tooltip: {},
		visualMap: {
			min: 0,
			max: 500,
			type: 'piecewise',
			orient: 'horizontal',
			left: 'center',
			top: 15
		},
		calendar: {
			top: 60,
			left: 30,
			right: 30,
			cellSize: ['auto', 13],
			range: '2021',
			itemStyle: {
				borderWidth: 0.5
			},
			yearLabel: {show: false}
		},
		series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: this.getVirtualData(2021)
		}
	};

	getVirtualData(year: any): any {
		year = year || '2021';
		let date = +echarts.number.parseDate(year + '-01-01');
		let end = +echarts.number.parseDate((+year) + '-04-01');
		let dayTime = 3600 * 24 * 1000*3;
		let data: any = [];
		for (let time = date; time < end; time += dayTime) {
			data.push([
				echarts.format.formatTime('yyyy-MM-dd', time, true),
				Math.floor(Math.random() * 500)
				]);
		}
		return data;
	}

}
