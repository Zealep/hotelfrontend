import { Nivel } from './nivel';
import { Categoria } from './categoria';
export class Habitacion{
  idHabitacion?: number;
  nivel?: Nivel;
  categoria?: Categoria;
  nombre?: string;
  detalle?: string;
  precio?: number;
  estatus?: string;
}
