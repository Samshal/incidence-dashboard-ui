import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import  * as L from 'leaflet'; 
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/layers.png";

@Component({
	selector: 'app-incident-view',
	templateUrl: './incident-view.component.html',
	styleUrls: ['./incident-view.component.css']
})
export class IncidentViewComponent implements OnInit {
	map;
	marker;
	@Input() incident: any;
	constructor() { }

	ngOnInit(): void {
		this.map = L.map("incident-poi").setView([46.879966, -121.726909], 13);
		let basemaps = {
			"Street Map": L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
			    maxZoom: 20,
			    subdomains:['mt0','mt1','mt2','mt3']
			}),
			"Aerial View": L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
			    maxZoom: 20,
			    subdomains:['mt0','mt1','mt2','mt3']
			})
		};

		let layer = L.control.layers(basemaps);

		this.marker = L.marker([46.879966, -121.726909]);
		(basemaps["Street Map"]).addTo(this.map);
		layer.addTo(this.map);
		this.marker.addTo(this.map);
	}

	invalidateSize(): void {
		setTimeout(() => {
	      this.map.invalidateSize();
	    }, 500);
	}

	ngOnChanges(changes: SimpleChanges){
		const currentIncident: SimpleChange = changes.incident;
		if (typeof currentIncident.currentValue.IncidentId !== "undefined"){
			let poi = currentIncident.currentValue.IncidentPointOfInterest;
			poi = (poi.replace("POINT(", "")).replace(")", "").split(" ");
			this.invalidateSize();
			this.map.setView(poi);
			this.marker.setLatLng(poi);
			this.marker.bindPopup(currentIncident.currentValue.IncidentTypeName);
		}
	}
}
