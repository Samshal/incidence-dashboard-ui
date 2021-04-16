import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerRequestService {

	private serverUrlEndpoint = 'http://localhost:5467/v1/';  // URL to web api
	constructor(private http: HttpClient) { 
	}

	get(url: any): Observable<any> {
		return this.http.get<any>(this.serverUrlEndpoint+url)
	}

	post(url: any, data: any): Observable<any> {
		return this.http.post<any>(this.serverUrlEndpoint+url, data);
	}
}
