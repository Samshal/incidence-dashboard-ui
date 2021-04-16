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
		}


	}

	loadSpatialEntityList(endpoint): void {
		this.serverRequest.get(endpoint).subscribe(res => {
			this.currentData.data = [];
			(res.contentData).forEach(data => {
				this.currentData.data.push({
					"id":data.EntityId,
					"text":data.EntityName,
					"parent":""
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
					"text":data.IncidentCategoryName
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

	loadParent(parent): void {
		this.serverRequest.get("spatial-entity/entity/view-entities-by-type?entityType="+parent).subscribe(res => {
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
}
