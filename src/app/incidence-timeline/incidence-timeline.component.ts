import { Component, OnInit } from '@angular/core';
import  * as L from 'leaflet'; 

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ServerRequestService } from '../server-request.service';
import { EventsService } from '../events.service';

@Component({
	selector: 'app-incidence-timeline',
	templateUrl: './incidence-timeline.component.html',
	styleUrls: ['./incidence-timeline.component.css']
})
export class IncidenceTimelineComponent implements OnInit {
	map;
	json;
	globalDateRange: any = {"startDate":"", "endDate":""};
	constructor(private http: HttpClient, private serverRequest: ServerRequestService, private eventsService: EventsService) { }

	ngOnInit(): void {
		this.eventsService.getEvent('timeline-element-selected').subscribe(response=>{
			if (response != null){
				console.log(response);
			}
		});

		this.eventsService.getEvent('date-selected').subscribe(response=>{
			if (response != null){
				this.globalDateRange = response;
			}
			setTimeout(()=>{
				this.loadTimelineDates();
			}, 500);
		});
	}

	leafletOptions = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '...' })
		],
		zoom: 5,
		center: L.latLng(11.0, 6.0)
	};

	onMapReady(map: L.Map): void {
		this.map = map;

		var geojsonMarkerOptions = {
		    radius: 8,
		    fillColor: "#00f",
		    color: "#000",
		    weight: 1,
		    opacity: 1,
		    fillOpacity: 0.8
		};

		var geojsonMarkerEventsOptions = {
		    radius: 2,
		    fillColor: "#f00",
		    color: "#fff",
		    weight: 0.3,
		    opacity: 0.7,
		    fillOpacity: 0.8
		};

		
		this.http.get('assets/data.geojson').subscribe((json: any) => {
	        console.log(json);
	        this.json = json;
	        L.geoJSON(this.json, {
	        	pointToLayer: function (feature, latlng) {
			        return L.circleMarker(latlng, geojsonMarkerOptions);
			    }
	        }).addTo(map);
	    });

	    this.http.get('assets/events.geojson').subscribe((json: any) => {
	        console.log(json);
	        this.json = json;
	        L.geoJSON(this.json, {
	        	pointToLayer: function (feature, latlng) {
			        return L.circleMarker(latlng, geojsonMarkerEventsOptions);
			    }
	        }).addTo(map);
	    });
	}

	timeline: any = [
		{date: new Date("01/01/2020"), title: '', 'content':''},
		{date: new Date("03/30/2020"), title: '', 'content':''},
		{date: new Date("07/23/2020"), title: '', 'content':''},
		{date: new Date("10/11/2020"), title: '', 'content':''},
		{date: new Date("01/25/2021"), title: '', 'content':''},
		{date: new Date("03/25/2021"), title: '', 'content':''},
	];

	loadTimelineDates():void {
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

}
