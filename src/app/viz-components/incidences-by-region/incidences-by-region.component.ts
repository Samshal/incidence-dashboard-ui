import { Component, OnInit } from '@angular/core';
import { EChartsOption, registerMap } from 'echarts';

import { ServerRequestService } from '../../server-request.service';
import { EventsService } from '../../events.service';

@Component({
	selector: 'app-incidences-by-region',
	templateUrl: './incidences-by-region.component.html',
	styleUrls: ['./incidences-by-region.component.css']
})
export class IncidencesByRegionComponent implements OnInit {
	chart;
	data;
	globalDateRange = {startDate:"", endDate:""};

	incidencesByRegionOption: EChartsOption = {
		title: {
			text: "Incidents by Regions",
			subtext: "",
			left: "center"
		},
		tooltip: {
			trigger: "item",
			formatter: '{b} : {c} (<b>{d}%</b>)'
		},
		legend: {
			bottom: 10,
			left: "center",
			data: []
		},
		series: [{
			type: "pie",
			radius: "65%",
			center: ["50%", "50%"],
			selectedMode: "single",
			data: []
		}],
	};

	constructor(private serverRequest: ServerRequestService, private eventsService: EventsService) {
	}

	ngOnInit(): void {
		this.eventsService.getEvent('date-selected').subscribe(response=>{
			if (response != null){
				this.globalDateRange = response;
			}
			setTimeout(()=>{
				this.loadData();
			}, 500);
		});
	}

	onChartInit(instance): any {
		this.chart = instance;
	}

	loadData():void {
		const sDate = this.globalDateRange.startDate;
		const eDate = this.globalDateRange.endDate;		
		this.serverRequest.get("incidents/stats/by-region?startDate="+sDate+"&endDate="+eDate).subscribe(response => {
			this.data = response.contentData;

			this.chart.setOption({
				legend:{
					data: this.data.legends
				},
				series:{
					data:this.data.data
				},
				title:{
					subtext:(this.data.legends).length+" Regions"
				}
			})
		})
	}
}
