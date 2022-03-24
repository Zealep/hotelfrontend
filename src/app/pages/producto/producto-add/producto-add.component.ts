import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../../models/producto';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})
export class ProductoAddComponent implements OnInit {

  constructor(private service: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(x: Producto) {
this.service.save(x)
.pipe(
catchError(error => {
this.snackBar.open(error, '', {
  duration: 3000
});
// catch & replace
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/producto']);
this.snackBar.open('Producto fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/producto']);
}
}

