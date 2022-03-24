
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ReservaComponent } from './reserva/reserva.component';
import { EgresoEditComponent } from './egreso/egreso-edit/egreso-edit.component';
import { EgresoAddComponent } from './egreso/egreso-add/egreso-add.component';
import { EgresoComponent } from './egreso/egreso.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAddComponent } from './categoria/categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { NivelComponent } from './nivel/nivel.component';
import { NivelAddComponent } from './nivel/nivel-add/nivel-add.component';
import { NivelEditComponent } from './nivel/nivel-edit/nivel-edit.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { TipoDocumentoAddComponent } from './tipo-documento/tipo-documento-add/tipo-documento-add.component';
import { TipoDocumentoEditComponent } from './tipo-documento/tipo-documento-edit/tipo-documento-edit.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoAddComponent } from './producto/producto-add/producto-add.component';
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';
import { HabitacionFormComponent } from './habitacion/habitacion-form/habitacion-form.component';
import { HabitacionComponent } from './habitacion/habitacion.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [ //
      {
        path: '', //
        pathMatch: 'full',
        redirectTo: 'reserva'
      },
      {
        path:'recepcion',
        component:RecepcionComponent
      },
      {
        path:'reserva',
        component:ReservaComponent
      },
      {
        path: 'egreso',
        component: EgresoComponent,
      },
      {
        path: 'egreso/add',
        component: EgresoAddComponent,
      },
      {
        path: 'egreso/edit/:id',
        component: EgresoEditComponent,
      },
      {
        path: 'categoria',
        component: CategoriaComponent,
      },
      {
        path: 'categoria/add',
        component: CategoriaAddComponent,
      },
      {
        path: 'categoria/edit/:id',
        component: CategoriaEditComponent,
      },
      {
        path: 'nivel',
        component: NivelComponent,
      },
      {
        path: 'nivel/add',
        component: NivelAddComponent,
      },
      {
        path: 'nivel/edit/:id',
        component: NivelEditComponent,
      },
      {
        path: 'tipodocumento',
        component: TipoDocumentoComponent,
      },
      {
        path: 'tipodocumento/add',
        component: TipoDocumentoAddComponent,
      },
      {
        path: 'tipodocumento/edit/:id',
        component: TipoDocumentoEditComponent,
      },
      {
        path: 'producto',
        component: ProductoComponent,
      },
      {
        path: 'producto/add',
        component: ProductoAddComponent,
      },
      {
        path: 'producto/edit/:id',
        component: ProductoEditComponent,
      },
      {
        path: 'habitacion',
        component: HabitacionComponent,
      },
      {
        path: 'habitacion/add',
        component: HabitacionFormComponent,
      },
      {
        path: 'habitacion/edit/:id',
        component: HabitacionFormComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
