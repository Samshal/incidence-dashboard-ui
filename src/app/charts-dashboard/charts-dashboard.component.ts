import { Component, OnInit } from '@angular/core';
import { EChartsOption, registerMap } from 'echarts';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.css']
})
export class ChartsDashboardComponent implements OnInit {

	constructor(private http: HttpClient) { }

	incidencesMapOption: EChartsOption = {};

	ngOnInit(): void {
		this.http.get<any>("/assets/nigeria.geojson").subscribe(res=>{
			registerMap("Nigeria", res);

			this.incidencesMapOption = {
				title: {
		            text: 'Incidents Map',
		            left: 'center'
		        },
		        tooltip: {
		            trigger: 'item',
		            showDelay: 0,
		            transitionDuration: 0.2,
		            formatter: function (params) {
		                let value = (params.value + '').split('.');
		                let _value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
		                return params.seriesName + '<br/>' + params.name + ': ' + _value;
		            }
		        },
		        visualMap: {
		            left: 'right',
		            min: 1,
		            max: 500,
		            inRange: {
		                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
		            },
		            text: ['High', 'Low'], 
		            calculable: true
		        },
		        series: [
		            {
		                name: 'Incidents',
		                type: 'map',
		                roam: true,
		                map: 'Nigeria',
		                emphasis: {
		                    label: {
		                        show: true
		                    }
		                },
		                data:[
		                    {name: 'Kaduna', value: 250},
		                    {name: 'Borno', value: 600},
		                    {name: 'Adamawa', value: 300},
		                    {name: 'Nasarawa', value: 88}
		                ]
		            }
		        ]
			}
		})
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

	northEastCategoriesOption: EChartsOption = {
		title: {
			text: "North East Incidence Categories",
			subtext: "18 States",
			left: "center"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		legend:{
			bottom:10,
			data: ['Armed Banditry Related', 'Terrorism', 'Armed Conflict']
		},
	    xAxis: [
	        {
	            type: 'category',
	            data: ["Adamawa", "Borno", "Taraba", "Yobe"],
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
		series: [
			{
				name: "Armed Banditry Related",
				type: "bar",
				barGap: 0,
				label: {},
				emphasis: {
					focus: "series"
				},
				data: [0,1,4,2]
			},
			{
				name: "Terrorism",
				type: "bar",
				barGap: 0,
				label: {},
				emphasis: {
					focus: "series"
				},
				data: [0,10,28,5]
			},
			{
				name: "Armed Conflict",
				type: "bar",
				barGap: 0,
				label: {},
				emphasis: {
					focus: "series"
				},
				data: [15,1,8,2]
			}
		],
	};

	northEastCasualtiesOption: EChartsOption = {
		tooltip: {
			trigger: "item",
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend:{
			top:10,
			data: ['KIA', 'MIA', 'WIA', 'Civillians Killed', 'Civillians Abducted', 'Criminals Killed', 'Suspects Arrested']
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
					{value: 4, name: "Suspects Arrested"}
				]
			},
		],
	};

	northEastTimeSeriesOption: EChartsOption = {
		title: {
			text: "Trend",
		},
		tooltip: {
			trigger: "axis"
		},
		legend:{
			data: ['Armed Banditry Related', 'Terrorism', 'Armed Conflict']
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
	            data: ["01/01/21", "03/01/21", "04/01/21", "10/01/21", "08/01/21"],
	            boundaryGap: false
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
		series: [
			{
				name: "Armed Banditry Related",
				type: "line",
				smooth: true,
				data: [0,1,4,2,5]
			},
			{
				name: "Terrorism",
				type: "line",
				smooth: true,
				data: [10,1,42,5,2]
			},
			{
				name: "Armed Conflict",
				type: "line",
				smooth: true,
				data: [0,11,0,0,50]
			},
		],
	};
}
