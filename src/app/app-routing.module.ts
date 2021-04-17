import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewIncidentComponent } from './new-incident/new-incident.component';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';
import { TrendsDashboardComponent } from './trends-dashboard/trends-dashboard.component';

const routes: Routes = [
	{
		path:"",
		redirectTo: "/dashboard/charts",
		pathMatch: "full"
	},
	{
		path: 'new-incident',
		component: NewIncidentComponent
	},
	{
		path: 'dashboard',
		children: [
			{
				path:"",
				redirectTo: "charts",
				pathMatch: "full"
			},
			{
				path:"charts",
				component: ChartsDashboardComponent
			},
			{
				path:"trends",
				component: TrendsDashboardComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
