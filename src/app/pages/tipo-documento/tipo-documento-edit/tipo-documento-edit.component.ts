import { Component, OnInit } from '@angular/core';
import { TipoDocumento } from '../../../models/tipo-documento';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../../services/nivel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento-edit',
  templateUrl: './tipo-documento-edit.component.html',
  styleUrls: ['./tipo-documento-edit.component.css']
})
export class TipoDocumentoEditComponent implements OnInit {

  id?: number;
  tipoDocumento?: TipoDocumento;

  constructor(private route: ActivatedRoute,
              private service: TipoDocumentoService,
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
      .subscribe(x => {
        this.tipoDocumento = x;
      });
  }

  submit(x : TipoDocumento) {
    x.idTipoDocumento = this.id;
    this.service.save(x)
      .subscribe(result => {
        this.router.navigate(['/pages/tipodocumento']);
        this.snackBar.open('El Tipo de documento fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/tipodocumento']);
  }

}
