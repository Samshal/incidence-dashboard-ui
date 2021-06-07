import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var $: any;

import { EventsService } from '../events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMenuItem = false;

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

  ngOnInit(): void {
  }

}
