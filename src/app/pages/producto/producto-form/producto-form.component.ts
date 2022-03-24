import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    marca: new FormControl(''),
    detalle: new FormControl(''),
    precioVenta: new FormControl('')
  });

  @Input() title!: string;
  @Input() labelSubmit!: string;
  @Input()set model(m: Producto | undefined){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Producto> = new EventEmitter<Producto>();
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
