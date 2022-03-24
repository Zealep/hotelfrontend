import { EgresoService } from './../../../services/egreso.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Egreso } from '../../../models/egreso';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-egreso-add',
  templateUrl: './egreso-add.component.html',
  styleUrls: ['./egreso-add.component.css']
})
export class EgresoAddComponent implements OnInit {

  constructor(private service: EgresoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(egreso: Egreso) {
this.service.save(egreso)
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
this.router.navigate(['/pages/egreso']);
this.snackBar.open('Egreso fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/egreso']);
}
}
