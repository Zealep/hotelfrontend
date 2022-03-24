import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoDocumento } from '../../../models/tipo-documento';

@Component({
  selector: 'app-tipo-documento-form',
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.css']
})
export class TipoDocumentoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl('')
  });

  @Input() title!: string;
  @Input() labelSubmit!: string;
  @Input()set model(m: TipoDocumento | undefined){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<TipoDocumento> = new EventEmitter<TipoDocumento>();
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



