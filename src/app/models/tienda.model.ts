import { ArticuloTienda } from './arituclo-tienda.model';
import { Articulo } from './articulo.model';

export class Tienda {
  tiendaId: number;
  sucursal: string;
  direccion: string;
  articuloTiendas?: ArticuloTienda[]; // Relación con Articulo

  constructor() {
      this.tiendaId = 0; // Inicializa con un valor por defecto
    this.sucursal = '';
    this.direccion = '';
    this.articuloTiendas = [];
  }
}
