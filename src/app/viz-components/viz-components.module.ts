import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';

import { IncidencesByRegionComponent } from './incidences-by-region/incidences-by-region.component';
import { IncidencesByStateComponent } from './incidences-by-state/incidences-by-state.component';
import { IncidencesByRegionBreakdownComponent } from './incidences-by-region-breakdown/incidences-by-region-breakdown.component';

@NgModule({
  declarations: [IncidencesByRegionComponent, IncidencesByStateComponent, IncidencesByRegionBreakdownComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
  	IncidencesByRegionComponent,
    IncidencesByStateComponent,
    IncidencesByRegionBreakdownComponent
  ]
})
export class VizComponentsModule { }
