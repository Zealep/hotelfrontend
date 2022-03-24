import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresoService } from '../../../services/egreso.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  id?: number;
  categoria?: Categoria;

  constructor(private route: ActivatedRoute,
              private service: CategoriaService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id')!;
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener la informacion, intentalo mas tarde', '', {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(categoria => {
        this.categoria = categoria;
      });
  }

  submit(x : Categoria) {
    x.idCategoria = this.id;
    this.service.save(x)
      .subscribe(result => {
        this.router.navigate(['/pages/categoria']);
        this.snackBar.open('La categoria fue modificada', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/categoria']);
  }

}

