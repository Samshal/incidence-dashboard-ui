import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewIncidentComponent } from './new-incident/new-incident.component';

const routes: Routes = [
	{
		path: 'new-incident',
		component: NewIncidentComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
