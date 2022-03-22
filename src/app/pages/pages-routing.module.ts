
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ReservaComponent } from './reserva/reserva.component';



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
      }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
