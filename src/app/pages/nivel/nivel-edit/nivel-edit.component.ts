import { Component, OnInit } from '@angular/core';
import { Nivel } from '../../../models/nivel';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../../services/nivel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-nivel-edit',
  templateUrl: './nivel-edit.component.html',
  styleUrls: ['./nivel-edit.component.css']
})
export class NivelEditComponent implements OnInit {

  id?: number;
  nivel?: Nivel;

  constructor(private route: ActivatedRoute,
              private service: NivelService,
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
      .subscribe(nivel => {
        this.nivel = nivel;
      });
  }

  submit(x : Nivel) {
    x.idNivel = this.id;
    this.service.save(x)
      .subscribe(result => {
        this.router.navigate(['/pages/nivel']);
        this.snackBar.open('El nivel fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/nivel']);
  }

}

