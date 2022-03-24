import { Habitacion } from './habitacion';
export class Reserva{
  idReserva?: number;
  habitacion?: Habitacion;
  apellidos?: string;
  nombres?: string;
  numeroDocumento?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  condicion?: string;
  porcentajePago?: number;
}
