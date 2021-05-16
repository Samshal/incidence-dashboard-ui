import { Component, OnInit } from '@angular/core';
import { EChartsOption, registerMap } from 'echarts';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServerRequestService } from '../server-request.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.css']
})
export class ChartsDashboardComponent implements OnInit {

	constructor(private http: HttpClient, private serverRequest: ServerRequestService, private eventsService: EventsService) { }

	incidencesMapOption: EChartsOption = {};

	ngOnInit(): void {
		this.eventsService.getEvent('date-selected').subscribe(response=>{
			if (response != null){
				this.globalDateRange = response;
			}
			setTimeout(()=>{
				this.loadIncidencesByRegionData();
			}, 500);
		});

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

	globalDateRange: any = {"startDate":"", "endDate":""};
	categoriesData;
	trendsData;
	regions: any = [
	];

	loadIncidencesByRegionData():void {
		const sDate = this.globalDateRange.startDate;
		const eDate = this.globalDateRange.endDate;		
		this.serverRequest
		.get("incidents/stats/load-incidences-by-region?startDate="+sDate+"&endDate="+eDate)
		.subscribe(response => {
			const data = response.contentData;
			this.categoriesData = data["types"]["categories"];
			this.trendsData = data["trends"]["categories"];

			this.regions = Object.keys(this.categoriesData);
		})
	}

	stringify(data: any): any {
		return JSON.stringify(data);
	}
}
