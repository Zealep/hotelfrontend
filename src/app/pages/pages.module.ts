import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { ReservaComponent } from './reserva/reserva.component';



@NgModule({
  declarations: [


    RecepcionComponent,
        ReservaComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFullCalendarModule
  ]
})
export class PagesModule { }
