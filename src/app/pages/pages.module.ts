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
import { FullCalendarModule } from '@fullcalendar/angular';
import { EgresoComponent } from './egreso/egreso.component';
import { NivelComponent } from './nivel/nivel.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { ProductoComponent } from './producto/producto.component';
import { EgresoFormComponent } from './egreso/egreso-form/egreso-form.component';
import { EgresoAddComponent } from './egreso/egreso-add/egreso-add.component';
import { EgresoEditComponent } from './egreso/egreso-edit/egreso-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { CategoriaAddComponent } from './categoria/categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { NivelFormComponent } from './nivel/nivel-form/nivel-form.component';
import { NivelAddComponent } from './nivel/nivel-add/nivel-add.component';
import { NivelEditComponent } from './nivel/nivel-edit/nivel-edit.component';
import { TipoDocumentoFormComponent } from './tipo-documento/tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoAddComponent } from './tipo-documento/tipo-documento-add/tipo-documento-add.component';
import { TipoDocumentoEditComponent } from './tipo-documento/tipo-documento-edit/tipo-documento-edit.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';
import { ProductoAddComponent } from './producto/producto-add/producto-add.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { HabitacionFormComponent } from './habitacion/habitacion-form/habitacion-form.component';



@NgModule({
  declarations: [
    RecepcionComponent,
    ReservaComponent,
    EgresoComponent,
    NivelComponent,
    TipoDocumentoComponent,
    ProductoComponent,
    EgresoFormComponent,
    EgresoAddComponent,
    EgresoEditComponent,
    CategoriaComponent,
    CategoriaFormComponent,
    CategoriaAddComponent,
    CategoriaEditComponent,
    NivelFormComponent,
    NivelAddComponent,
    NivelEditComponent,
    TipoDocumentoFormComponent,
    TipoDocumentoAddComponent,
    TipoDocumentoEditComponent,
    ProductoFormComponent,
    ProductoEditComponent,
    ProductoAddComponent,
    HabitacionComponent,
    HabitacionFormComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule
  ]
})
export class PagesModule { }
