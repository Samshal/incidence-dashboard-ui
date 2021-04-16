import { Component, OnInit } from '@angular/core';
import  * as L from 'leaflet'; 

import { ServerRequestService } from '../server-request.service';

@Component({
	selector: 'app-new-incident',
	templateUrl: './new-incident.component.html',
	styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {
	public functions;
	constructor(private serverRequest: ServerRequestService) { 
	}

	ngOnInit(): void {
		this.loadCountries();
	}

	select2Options: any = {
		containerCssClass: "form-control",
		width: "100%"
	}

	select2Options_multiple: any = {
		containerCssClass: "form-control",
		width: "100%",
		multiple: true
	}

	select2Data: any = {
		countryList: [],
		regionList: [],
		stateList: [],
		lgaList: [],
		localityList: [],
		incidentTypeList: [],
		incidentList: [],
		factionList: [],
		friendlyForcesList: [],
		terrainList: [],
		associatedFeatureList: []
	}

	leafletOptions = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 5,
		center: L.latLng(46.879966, -121.726909)
	};

	loadCountries(): void {
		this.serverRequest.get("spatial-entity/entity/view-entities-by-type?entityType=1").subscribe(res => {
			this.select2Data.countryList = [];
			(res.contentData).forEach(data => {
				this.select2Data.countryList.push({
					"id":data.EntityId,
					"text":data.EntityName
				})
			})
		});
	}

}
