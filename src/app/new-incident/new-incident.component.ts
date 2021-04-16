import { Component, OnInit } from '@angular/core';
import  * as L from 'leaflet'; 

import { ServerRequestService } from '../server-request.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';  

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
		this.initFormData();
		
		this.loadCountries();
		this.loadIncidentCategories();
		let metadataFields = [
			{"id":"faction", "list":"factionList"},
			{"id":"friendly_forces", "list":"friendlyForcesList"},
			{"id":"terrain", "list":"terrainList"},
			{"id":"associated_feature", "list":"associatedFeatureList"},
		];

		metadataFields.forEach(field => {
			this.loadMetadata(field.id, field.list);
		})
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
		incidentCategoryList: [],
		incidentTypeList: [],
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

	formData: any = {
	}

	initFormData(): void {
		this.formData = {
			country: "",
			region: "",
			state: "",
			lga: "",
			locality: "",
			incidentTitle:"",
			incidentCategory: "",
			incidentType: "",
			faction: [],
			friendlyForces: [],
			terrain:[],
			associatedFeatures:[],
			kia:0,
			mia:0,
			wia:0,
			civilliansKilled:0,
			civilliansAbducted:0,
			criminalsKilled:0,
			suspectsArrested:0,
			comments:""
		}
	}

	loadCountries(): void {
		this.loadSpatialEntityList("countryList", "spatial-entity/entity/view-entities-by-type?entityType=1")
	}

	loadSpatialEntityChildren(list, parentId): void {
		this.loadSpatialEntityList(list, "spatial-entity/entity/view-entity-children?entityId="+parentId);
	}

	loadSpatialEntityList(list, endpoint): void {
		this.serverRequest.get(endpoint).subscribe(res => {
			this.select2Data[list] = [];
			(res.contentData).forEach(data => {
				this.select2Data[list].push({
					"id":data.EntityId,
					"text":data.EntityName
				})
			})
		});		
	}

	loadRegions(event): void{
		this.loadSpatialEntityChildren("regionList", this.formData.country);
	}

	loadStates(event): void{
		this.loadSpatialEntityChildren("stateList", this.formData.region);
	}

	loadLgas(event): void{
		this.loadSpatialEntityChildren("lgaList", this.formData.state);
	}

	loadLocalities(event): void{
		this.loadSpatialEntityChildren("localityList", this.formData.lga);
	}

	loadIncidentCategories(): void {
		this.serverRequest.get("incidents/incident-type/view-categories").subscribe(res => {
			this.select2Data.incidentCategoryList = [];
			(res.contentData).forEach(data => {
				this.select2Data.incidentCategoryList.push({
					"id":data.IncidentCategoryId,
					"text":data.IncidentCategoryName,
				})
			})
		});		
	}

	loadIncidentTypes(event): void {
		this.serverRequest.get("incidents/incident-type/view-incident-types?resourceId="+this.formData.incidentCategory).subscribe(res => {
			this.select2Data.incidentTypeList = [];
			(res.contentData).forEach(data => {
				this.select2Data.incidentTypeList.push({
					"id":data.IncidentTypeId,
					"text":data.IncidentTypeName,
				})
			})
		});				
	}

	loadMetadata(field, list): void {
		this.serverRequest.get("incidents/metadata/view-values?field="+field).subscribe(res => {
			this.select2Data[list] = [];
			(res.contentData).forEach(data => {
				this.select2Data[list].push({
					"id":data.Value,
					"text":data.Value,
				})
			})
		});
	}

	saveIncidence(): void {
		let incidentData: any = {
			name: this.formData.incidentTitle,
			type: this.formData.incidentType,
			location: this.formData.locality,
			date: (new Date(this.formData.incidentDate)).toLocaleDateString()+ " " +this.formData.incidentTime,
			pointOfInterest: "POINT("+this.formData.poiLatitude+" "+this.formData.poiLongitude+")",
			description: this.formData.comments,
			metadata: [
				{number_killed_in_action: this.formData.kia},
				{number_missing_in_action: this.formData.mia},
				{number_wounded_in_action: this.formData.wia},
				{number_of_civillians_killed: this.formData.civilliansKilled},
				{number_of_civillians_abducted: this.formData.civilliansAbducted},
				{number_of_criminals_killed: this.formData.criminalsKilled},
				{number_of_suspect_arrested: this.formData.suspectsArrested}
			]
		}

		this.formData.faction.forEach(f=>{
			incidentData.metadata.push({
				faction:f
			})
		})

		this.formData.friendlyForces.forEach(f=>{
			incidentData.metadata.push({
				friendly_forces:f
			})
		})

		this.formData.terrain.forEach(f=>{
			incidentData.metadata.push({
				terrain:f
			})
		})

		this.formData.associatedFeatures.forEach(f=>{
			incidentData.metadata.push({
				associated_feature:f
			})
		})

		this.serverRequest.post("incidents/incident/new-incident", incidentData).subscribe(res => {
			Swal.fire('Operation Successful', 'Incidence has been saved successfully', 'success');
			this.initFormData();
		}, err => {
			Swal.fire("An error occurred", "Incidence record not saved", "error");
		});		
	}
}
