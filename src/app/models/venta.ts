import { Recepcion } from './recepcion';
import { DetalleVenta } from './detalleVenta';
export class Venta{
  idVenta?: number;
  recepcion?: Recepcion;
  detalleVentas?: DetalleVenta[];
  fechaVenta?: Date;
  subTotal?: number;
  igv?: number;
  total?: number;
  condicion?: string;
}
