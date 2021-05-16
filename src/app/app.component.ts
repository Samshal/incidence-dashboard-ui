import { Component } from '@angular/core';
import * as moment from 'moment';

import { EventsService } from './events.service';

declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'incidence-dashboard';

	selectedDate: any;
	alwaysShowCalendars: boolean;
	ranges: any = {
	  'Today': [moment(), moment()],
	  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	  'This Month': [moment().startOf('month'), moment().endOf('month')],
	  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	  'One Year Ago':[moment().subtract(1, 'year'), moment()]
	}

	constructor(private eventsService: EventsService) {
	  this.alwaysShowCalendars = true;
	}

	changed(evt: any): any {
		if (typeof this.selectedDate != "undefined" && this.selectedDate.endDate !== null){
			this.eventsService.broadcast("date-selected", {
				startDate:this.selectedDate.startDate.format("YYYY-MM-DD"),
				endDate: this.selectedDate.endDate.format("YYYY-MM-DD")
			});
		}
	}
}
