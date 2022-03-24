import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../models/categoria';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  constructor(private service: CategoriaService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(x: Categoria) {
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
this.router.navigate(['/pages/categoria']);
this.snackBar.open('Categoria fue registrada', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/categoria']);
}
}

