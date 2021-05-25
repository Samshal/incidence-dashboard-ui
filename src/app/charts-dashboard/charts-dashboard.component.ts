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
