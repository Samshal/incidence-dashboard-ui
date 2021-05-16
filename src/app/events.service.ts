import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class EventsService {
	private behaviorSubjects: Map<string, BehaviorSubject<any>>;

	constructor() {
		this.behaviorSubjects = new Map<string, BehaviorSubject<any>>();
	}

	private getBehaviorSubject(identifier: string): BehaviorSubject<any> {
		let behaviorSubject: any = this.behaviorSubjects.get(identifier);
		if (!behaviorSubject) {
			behaviorSubject = new BehaviorSubject<any>(null);
			this.behaviorSubjects.set(identifier, behaviorSubject);
		}

		return behaviorSubject;
	}

	public broadcast(event: string, eventData: any): void {
		this.getBehaviorSubject(event).next(eventData);
	}

	public getEvent(event: string): BehaviorSubject<any> {
		const behaviorSubject = this.getBehaviorSubject(event);
		return behaviorSubject;
	}
}
