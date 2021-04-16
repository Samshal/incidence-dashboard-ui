import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.css']
})
export class ChartsDashboardComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	incidencesByRegionOption: EChartsOption = {
		title: {
			text: "Incidents by Regions",
			subtext: "6 Regions",
			left: "center"
		},
		tooltip: {
			trigger: "item",
			formatter: '{b} : {c} (<b>{d}%</b>)'
		},
		legend: {
			bottom: 10,
			left: "center",
			data: ["SW", "NC", "NE", "NW", "SE", "SS"]
		},
		series: [{
			type: "pie",
			radius: "65%",
			center: ["50%", "50%"],
			selectedMode: "single",
			data: [
				{
					value: 19,
					name: "SW",
				},
				{
					value: 25,
					name: "NC",
				},
				{
					value: 32,
					name: "NE",
				},
				{
					value: 46,
					name: "NW",
				},
				{
					value: 18,
					name: "SE",
				},
				{
					value: 17,
					name: "SS",
				}
			]
		}],
	};

	incidencesByStateOption: EChartsOption = {
		title: {
			text: "Incidents by States",
			subtext: "18 States",
			left: "center"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['Abia', 'Bayelsa', 'Benue', 'Borno', 'Delta', 'Enugu', 'Imo', 'Kaduna', 'Kano', 'Katsina', 'Niger', 'Ogun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Zamfara'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
		series: [{
			name: "Incidents",
			type: "bar",
			barWidth: "65%",
			data: [3,2,7,28,5,5,7,16,5,8,14,7,9,2,7,9,2,7]
		}],
	};

}
