import { Component, OnInit } from '@angular/core';
import { EChartsOption, registerMap } from 'echarts';

import { ServerRequestService } from '../../server-request.service';
import { EventsService } from '../../events.service';

@Component({
	selector: 'app-incidences-by-state',
	templateUrl: './incidences-by-state.component.html',
	styleUrls: ['./incidences-by-state.component.css']
})
export class IncidencesByStateComponent implements OnInit {
	chart;
	data;
	globalDateRange = {startDate:"", endDate:""};

	incidencesByStateOption: EChartsOption = {
		title: {
			text: "Incidents by States",
			subtext: "",
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
	            data: [],
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
			data: []
		}],
	};

	constructor(private serverRequest: ServerRequestService, private eventsService: EventsService) { }

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
		this.serverRequest.get("incidents/stats/by-state?startDate="+sDate+"&endDate="+eDate).subscribe(response => {
			this.data = response.contentData;

			this.chart.setOption({
				xAxis:{
					data: this.data.legends
				},
				series:{
					data:this.data.values
				},
				title:{
					subtext:(this.data.legends).length+" States"
				}
			})
		})
	}

}
