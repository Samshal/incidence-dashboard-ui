import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { ServerRequestService } from '../server-request.service';

declare var $: any;

@Component({
	selector: 'app-metadata',
	templateUrl: './metadata.component.html',
	styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement;

	dtOptions: any  = {};
	dtTrigger: Subject<any> = new Subject<any>();
	constructor(private serverRequest: ServerRequestService) { }

	ngOnInit(): void {
		this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 10
	    };

	    // this.dtTrigger.next();
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		  dtInstance.destroy();
		  this.dtTrigger.next();
		});
	}

	currentData: any = {
		title: "",
		data: []
	}

	newRecord: any = {}

	entityParent: any = [];

	loadData(dataType): void {
		this.currentData.type = dataType;
		this.currentData.parent = 0;
		switch(dataType) {
			case "countries": {
				this.currentData.title = "Countries";
				this.currentData.parent = 0
				this.loadSpatialEntityList("spatial-entity/entity/view-entities-by-type?entityType=1")
				break;
			}
			case "regions": {
				this.currentData.title = "Regions";
				this.currentData.parent = 1
				this.loadSpatialEntityList("spatial-entity/entity/view-entities-by-type?entityType=2")
				break;
			}
			case "states": {
				this.currentData.title = "States";
				this.currentData.parent = 2
				this.loadSpatialEntityList("spatial-entity/entity/view-entities-by-type?entityType=3")
				break;
			}
			case "lgas": {
				this.currentData.title = "LGAs";
				this.currentData.parent = 3
				this.loadSpatialEntityList("spatial-entity/entity/view-entities-by-type?entityType=4")
				break;
			}
			case "localities": {
				this.currentData.title = "Localities";
				this.currentData.parent = 4
				this.loadSpatialEntityList("spatial-entity/entity/view-entities-by-type?entityType=5")
				break;
			}
			case "incident-categories": {
				this.currentData.title = "Incident Categories";
				this.currentData.parent = 0
				this.loadIncidentCategories()
				break;
			}
			case "incident-types": {
				this.currentData.title = "Incident Types";
				this.currentData.parent = 0
				this.loadIncidentTypes()
				break;
			}
			case "factions": {
				this.currentData.title = "Factions";
				this.loadMetadata("faction");
				break;
			}
			case "friendly-forces": {
				this.currentData.title = "Friendly Forces";
				this.loadMetadata("friendly_forces");
				break;
			}
			case "terrain": {
				this.currentData.title = "Terrain Types";
				this.loadMetadata("terrain");
				break;
			}
			case "associated-features": {
				this.currentData.title = "Landmarks / Associated Features";
				this.loadMetadata("associated_feature");
				break;
			}
		}
	}

	saveData(): void {
		let postUrl = "spatial-entity/entity/new-entity";
		let data: any = {
			entityName: this.newRecord.value,
			entityParentId: this.newRecord.parent,
			description: this.newRecord.desc
		}
		switch(this.currentData.type) {
			case "countries":{
				data.entityType = 1;
				data.entityParentId = 0;
				this.saveSpatialEntity(postUrl, data);
				break;
			}
			case "regions":{
				data.entityType = 2;
				this.saveSpatialEntity(postUrl, data);
				break;
			}
			case "states":{
				data.entityType = 3;
				this.saveSpatialEntity(postUrl, data);
				break;
			}
			case "lgas":{
				data.entityType = 4;
				this.saveSpatialEntity(postUrl, data);
				break;
			}
			case "localities":{
				data.entityType = 5;
				this.saveSpatialEntity(postUrl, data);
				break;
			}
			case "incident-categories":{
				data = {
					name: this.newRecord.value,
					description: this.newRecord.desc
				}
				this.saveIncidentCategory(data);
				break;
			}
			case "incident-types":{
				data = {
					name: this.newRecord.value,
					category: this.newRecord.parent,
					description: this.newRecord.desc
				}
				this.saveIncidentType(data);
				break;
			}
			case "factions":{
				data = {
					field:"faction",
					value: this.newRecord.value
				}
				this.saveMetadata(data);
				break;
			}
			case "friendly-forces":{
				data = {
					field:"friendly_forces",
					value: this.newRecord.value
				}
				this.saveMetadata(data);
				break;
			}
			case "terrain":{
				data = {
					field:"terrain",
					value: this.newRecord.value
				}
				this.saveMetadata(data);
				break;
			}
			case "associated-features":{
				data = {
					field:"associated_feature",
					value: this.newRecord.value
				}
				this.saveMetadata(data);
				break;
			}
		}


	}

	loadSpatialEntityList(endpoint): void {
		this.serverRequest.get(endpoint).subscribe(res => {
			this.currentData.data = [];
			(res.contentData).forEach(data => {
				this.currentData.data.push({
					"id":data.EntityId,
					"text":data.EntityName,
					"parent":data.EntityParent
				})
			}, error => {
				this.currentData.data = [];
			})
			this.rerender();
		});		
	}

	loadIncidentCategories(): void {
		this.serverRequest.get("incidents/incident-type/view-categories").subscribe(res => {
			this.currentData.data = [];
			(res.contentData).forEach(data => {
				this.currentData.data.push({
					"id":data.IncidentCategoryId,
					"text":data.IncidentCategoryName,
					"parent":""
				})
			}, error => {
				this.currentData.data = [];
			})
			this.rerender();
		});		
	}

	loadIncidentTypes(): void {
		this.serverRequest.get("incidents/incident-type/view-incident-types?resourceId=0").subscribe(res => {
			this.currentData.data = [];
			(res.contentData).forEach(data => {
				this.currentData.data.push({
					"id":data.IncidentTypeId,
					"text":data.IncidentTypeName,
					"parent":data.IncidentCategoryName
				})
			}, error => {
				this.currentData.data = [];
			})
			this.rerender();
		});		
	}

	loadMetadata(field): void {
		this.serverRequest.get("incidents/metadata/view-values?field="+field).subscribe(res => {
			this.currentData.data = [];
			(res.contentData).forEach(data => {
				this.currentData.data.push({
					"id":data.ValueId,
					"text":data.Value,
					"parent":""
				})
			}, error => {
				this.currentData.data = [];
			})
			this.rerender();
		});				
	}

	saveSpatialEntity(url, data): void {
		this.serverRequest.post(url, data).subscribe(res => {
			$("#modal_add").modal("hide");
			this.loadData(this.currentData.type);
			this.newRecord = {}
		}, error => {
			console.log(error)
		})
	}

	saveIncidentCategory(data): void {
		this.serverRequest.post("incidents/incident-type/new-incident-category", data).subscribe(res => {
			$("#modal_add").modal("hide");
			this.loadData(this.currentData.type);
			this.newRecord = {}
		}, error => {
			console.log(error)
		})		
	}

	saveIncidentType(data): void {
		this.serverRequest.post("incidents/incident-type/new-incident-type", data).subscribe(res => {
			$("#modal_add").modal("hide");
			this.loadData(this.currentData.type);
			this.newRecord = {}
		}, error => {
			console.log(error)
		})		
	}

	saveMetadata(data): void {
		this.serverRequest.post("incidents/metadata/new-value", data).subscribe(res => {
			$("#modal_add").modal("hide");
			this.loadData(this.currentData.type);
			this.newRecord = {}
		}, error => {
			console.log(error)
		})		
	}

	loadParent(): void {
		let spatialEntities = ["countries", "regions", "states", "lgas", "localities"];
		if (spatialEntities.includes(this.currentData.type)){
			this.serverRequest.get("spatial-entity/entity/view-entities-by-type?entityType="+this.currentData.parent).subscribe(res => {
				this.entityParent = [];
				(res.contentData).forEach(data => {
					this.entityParent.push({
						"id":data.EntityId,
						"text":data.EntityName
					})
				}, error => {
					this.entityParent = [];
				})
			});		
		}
		else {
			if (this.currentData.type == "incident-types"){
				this.serverRequest.get("incidents/incident-type/view-categories").subscribe(res => {
					this.entityParent = [];
					(res.contentData).forEach(data => {
						this.entityParent.push({
							"id":data.IncidentCategoryId,
							"text":data.IncidentCategoryName,
						})
					}, error => {
						this.entityParent = [];
					})
				});	
			}
		}
	}
}
