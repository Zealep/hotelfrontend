import { Component, OnInit } from '@angular/core';
import { NivelService } from '../../services/nivel.service';
import { HabitacionService } from '../../services/habitacion.service';
import { Nivel } from '../../models/nivel';
import { Habitacion } from '../../models/habitacion';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit {

  niveles: Nivel[] = [];
  habitaciones: Habitacion[] = [];

  constructor(private nivelService:NivelService,
    private habitacionService:HabitacionService) { }

  ngOnInit(): void {
    this.listNiveles();
  }

  listNiveles(){
    this.nivelService.list().subscribe(x=>{
      this.niveles = x;
    })
  }

  buscarPorNivel(idNivel:number){
    this.habitacionService.getByNivel(idNivel).subscribe(x=>{
      this.habitaciones = x;
    })
  }

}
