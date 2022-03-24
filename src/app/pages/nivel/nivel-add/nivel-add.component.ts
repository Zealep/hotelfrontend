import { Component, OnInit } from '@angular/core';
import { NivelService } from '../../../services/nivel.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nivel } from '../../../models/nivel';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-nivel-add',
  templateUrl: './nivel-add.component.html',
  styleUrls: ['./nivel-add.component.css']
})
export class NivelAddComponent implements OnInit {

  constructor(private service: NivelService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(x: Nivel) {
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
this.router.navigate(['/pages/nivel']);
this.snackBar.open('Nivel fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/nivel']);
}
}

