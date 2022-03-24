import { Habitacion } from './habitacion';
import { TipoDocumento } from './tipo-documento';
export class Recepcion{
    idRecepcion?: number;
    habitacion?: Habitacion;
    tipoDocumento?: TipoDocumento;
    apellidos?: string;
    nombres?: string;
    numeroDocumento?: string;
    direccion?: string;
    tarifaHora?: number;
    precio?: number;
    adelanto?: number;
    fechaEntrada?: Date;
    fechaSalida?: Date;
    lateCheckout?: number;
    total?: number;
    condicion?: string;
}
