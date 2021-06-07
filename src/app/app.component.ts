import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'incidence-dashboard';
	authPage = true;
	authPages = ["/", "/login"];
	constructor(private router: Router) {
		const currentPath = window.location.pathname;
		this.authPage = this.authPages.includes(currentPath);
	}
}
