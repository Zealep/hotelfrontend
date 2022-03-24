import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Egreso } from '../../../models/egreso';

@Component({
  selector: 'app-egreso-form',
  templateUrl: './egreso-form.component.html',
  styleUrls: ['./egreso-form.component.css']
})
export class EgresoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fecha: new FormControl(''),
    descripcion: new FormControl(''),
    monto: new FormControl('')
  });

  @Input() title!: string;
  @Input() labelSubmit!: string;
  @Input()set model(m: Egreso | undefined){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Egreso> = new EventEmitter<Egreso>();
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

