import { EgresoService } from './../../../services/egreso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Egreso } from '../../../models/egreso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-egreso-edit',
  templateUrl: './egreso-edit.component.html',
  styleUrls: ['./egreso-edit.component.css']
})
export class EgresoEditComponent implements OnInit {

  id?: number;
  egreso?: Egreso;

  constructor(private route: ActivatedRoute,
              private service: EgresoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id')!;
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el egreso, intentalo mas tarde', '', {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(egreso => {
        this.egreso = egreso;
      });
  }

  submit(egreso : Egreso) {
    egreso.idEgreso = this.id;
    this.service.save(egreso)
      .subscribe(result => {
        this.router.navigate(['/pages/egreso']);
        this.snackBar.open('El egreso fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/egreso']);
  }

}
