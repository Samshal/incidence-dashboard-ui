import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { ServerRequestService } from '../server-request.service';

declare var $: any;

@Component({
  selector: 'app-incidence-workspace',
  templateUrl: './incidence-workspace.component.html',
  styleUrls: ['./incidence-workspace.component.css']
})
export class IncidenceWorkspaceComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement;

	dtOptions: any  = {};
	dtTrigger: Subject<any> = new Subject<any>();


	currentData: any = [
	];

	currentView: any = {};
	
	constructor(private serverRequest: ServerRequestService) { }

	ngOnInit(): void {
		this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 10
	    };

	    this.loadIncidents();
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

	loadIncidents(): void {
		this.serverRequest.get("incidents/incident/view-incidents").subscribe(res => {
			this.currentData = [];
			(res.contentData).forEach(data => {
				this.currentData.push(data)
			}, error => {
				this.currentData = [];
			})
			console.table(this.currentData);
			this.rerender();
		});
	}
}
