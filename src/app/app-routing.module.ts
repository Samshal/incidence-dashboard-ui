import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewIncidentComponent } from './new-incident/new-incident.component';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';

const routes: Routes = [
	{
		path: 'new-incident',
		component: NewIncidentComponent
	},
	{
		path: 'dashboard',
		component: ChartsDashboardComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
