import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Nivel } from '../../../models/nivel';

@Component({
  selector: 'app-nivel-form',
  templateUrl: './nivel-form.component.html',
  styleUrls: ['./nivel-form.component.css']
})
export class NivelFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl('')
  });

  @Input() title!: string;
  @Input() labelSubmit!: string;
  @Input()set model(m: Nivel | undefined){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Nivel> = new EventEmitter<Nivel>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.valid) {
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Egreso
    } else {
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}



