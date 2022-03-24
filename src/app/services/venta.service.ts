import { HOST } from '../shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Respuesta } from '../models/respuesta';
import { Venta } from '../models/venta';
@Injectable({
  providedIn: 'root'
})
export class VentaService{

  private url: string = `${HOST}/venta`;

  constructor(private http: HttpClient, private router: Router) {
  }

  list() {
    return this.http.get<Venta[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Venta>(`${this.url}/find/${id}`);
  }


  save(x: Venta) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
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
