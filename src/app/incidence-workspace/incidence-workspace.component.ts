import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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


	currentData: any = [];
	
	constructor() { }

	ngOnInit(): void {
		this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 10
	    };
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

}
