import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewIncidentComponent } from './new-incident/new-incident.component';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';
import { TrendsDashboardComponent } from './trends-dashboard/trends-dashboard.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { IncidenceWorkspaceComponent } from './incidence-workspace/incidence-workspace.component';
import { IncidenceTimelineComponent } from './incidence-timeline/incidence-timeline.component';

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
			},
			{
				path:"timeline",
				component: IncidenceTimelineComponent
			},
			{
				path:"descriptive-summary",
				component: ComingSoonComponent
			}
		]
	},
	{
		path: 'coming-soon',
		component: ComingSoonComponent
	},
	{
		path: 'incidence-workspace',
		component: IncidenceWorkspaceComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
