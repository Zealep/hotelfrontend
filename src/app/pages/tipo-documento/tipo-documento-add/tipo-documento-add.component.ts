import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDocumento } from '../../../models/tipo-documento';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-tipo-documento-add',
  templateUrl: './tipo-documento-add.component.html',
  styleUrls: ['./tipo-documento-add.component.css']
})
export class TipoDocumentoAddComponent implements OnInit {

  constructor(private service: TipoDocumentoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(x: TipoDocumento) {
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
this.router.navigate(['/pages/tipodocumento']);
this.snackBar.open('Tipo de documento fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/tipodocumento']);
}
}
