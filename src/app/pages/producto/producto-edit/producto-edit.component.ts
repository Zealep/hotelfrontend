import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  id?: number;
  producto?: Producto;

  constructor(private route: ActivatedRoute,
              private service: ProductoService,
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
      .subscribe(producto => {
        this.producto = producto;
      });
  }

  submit(x : Producto) {
    x.idProducto = this.id;
    this.service.save(x)
      .subscribe(result => {
        this.router.navigate(['/pages/producto']);
        this.snackBar.open('El producto fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/producto']);
  }

}
