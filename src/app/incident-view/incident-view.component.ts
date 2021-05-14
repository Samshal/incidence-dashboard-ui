import { Component, OnInit, Input } from '@angular/core';
import  * as L from 'leaflet'; 

@Component({
	selector: 'app-incident-view',
	templateUrl: './incident-view.component.html',
	styleUrls: ['./incident-view.component.css']
})
export class IncidentViewComponent implements OnInit {

	@Input() incident: any;
	constructor() { }

	ngOnInit(): void {
	}

	leafletOptions = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 5,
		center: L.latLng(46.879966, -121.726909)
	};
}
