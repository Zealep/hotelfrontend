import { Component, OnInit } from '@angular/core';
import { Nivel } from '../../../models/nivel';
import { Categoria } from '../../../models/categoria';
import { HabitacionService } from '../../../services/habitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../../services/nivel.service';
import { CategoriaService } from '../../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Habitacion } from '../../../models/habitacion';

@Component({
  selector: 'app-habitacion-form',
  templateUrl: './habitacion-form.component.html',
  styleUrls: ['./habitacion-form.component.css']
})
export class HabitacionFormComponent implements OnInit {

  niveles: Nivel[] = [];
  categorias: Categoria[] = [];
  idHabitacion?:number;


  form: FormGroup = new FormGroup({
    nivel: new FormControl(''),
    categoria: new FormControl(''),
    nombre: new FormControl(''),
    detalle: new FormControl(''),
    precio: new FormControl(''),
  })

  constructor(private habitacionService: HabitacionService,
    private nivelService: NivelService,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.idHabitacion = +this.route.snapshot.paramMap.get('id')!;
    console.log('id habitacion',this.idHabitacion)

    this.listCategorias();
    this.listNiveles();
    this.initEditForm();
  }

  private listNiveles() {
    this.nivelService.list()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los doctores, intentalo mas tarde', '', {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(x => {
        this.niveles = x;
      });
  }

  private listCategorias() {
    this.categoriaService.list()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los doctores, intentalo mas tarde', '', {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(x => {
        this.categorias = x;
      });
  }


  saveForm(){

    let habitacion = new Habitacion();
    let nivel = new Nivel();
    let categoria = new Categoria();

    if(this.idHabitacion!=0){
      habitacion.idHabitacion = this.idHabitacion;
    }

    nivel.idNivel = this.form.get('nivel')!.value;
    habitacion.nivel = nivel;

    categoria.idCategoria = this.form.get('categoria')!.value;
    habitacion.categoria = categoria;

    habitacion.nombre = this.form.get('nombre')!.value;
    habitacion.detalle = this.form.get('detalle')!.value;
    habitacion.precio = this.form.get('precio')!.value;



    this.habitacionService.save(habitacion)
    .subscribe(result =>{
      this.router.navigate(['/pages/habitacion']);
      this.snackBar.open('Se registro la cita correctamente', 'Close', {
        duration: 5000
      });
    });
  }

  initEditForm(){
    if(this.idHabitacion!=0){
      this.habitacionService.getById(this.idHabitacion!).subscribe(c =>{
        this.form.controls['nivel'].setValue(c.nivel?.idNivel);
        this.form.controls['categoria'].setValue(c.categoria?.idCategoria);
        this.form.controls['nombre'].setValue(c.nombre);
        this.form.controls['detalle'].setValue(c.detalle);
        this.form.controls['precio'].setValue(c.precio);
      });
    }

}

  clearForm(){
    this.form.reset();
  }
  cancel(){
    this.router.navigate(['/pages/habitacion']);
  }

}

