import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTablesModule } from "angular-datatables";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { NewIncidentComponent } from './new-incident/new-incident.component';

import * as $ from 'jquery';
import * as bootstrap from "bootstrap";
import { NgSelect2Module } from 'ng-select2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { MetadataComponent } from './metadata/metadata.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsDashboardComponent } from './charts-dashboard/charts-dashboard.component';
import { TrendsDashboardComponent } from './trends-dashboard/trends-dashboard.component';
import { IncidenceWorkspaceComponent } from './incidence-workspace/incidence-workspace.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { IncidentViewComponent } from './incident-view/incident-view.component';

import { VizComponentsModule } from './viz-components/viz-components.module';
import { IncidenceTimelineComponent } from './incidence-timeline/incidence-timeline.component';

import { HorizontalTimelineComponent } from './horizontal-timeline/horizontal-timeline.component';
import { MetadataFriendlyForcesLocationsComponent } from './metadata-friendly-forces-locations/metadata-friendly-forces-locations.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NewIncidentComponent,
    MetadataComponent,
    ChartsDashboardComponent,
    TrendsDashboardComponent,
    IncidenceWorkspaceComponent,
    ComingSoonComponent,
    IncidentViewComponent,
    IncidenceTimelineComponent,
    HorizontalTimelineComponent,
    MetadataFriendlyForcesLocationsComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelect2Module,
    LeafletModule,
    LeafletDrawModule,
    DataTablesModule,
    NgxDaterangepickerMd.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    VizComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
