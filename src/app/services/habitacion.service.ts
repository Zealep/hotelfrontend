import { HOST } from '../shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Respuesta } from '../models/respuesta';
import { Habitacion } from '../models/habitacion';
@Injectable({
  providedIn: 'root'
})
export class HabitacionService{

  private url: string = `${HOST}/habitacion`;

  constructor(private http: HttpClient, private router: Router) {
  }

  list() {
    return this.http.get<Habitacion[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Habitacion>(`${this.url}/find/${id}`);
  }


  save(x: Habitacion) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }

  getByNivel(id: number){
    return this.http.get<Habitacion[]>(`${this.url}/find/nivel/${id}`);
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Error en peticion del servicio');

  }

}
