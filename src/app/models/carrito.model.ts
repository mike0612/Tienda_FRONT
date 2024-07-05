import { Articulo } from './articulo.model';

export class Carrito {
  carritoId: number;
  clienteId: number;
  articulos: { articulo: Articulo, cantidad: number }[];

  constructor() {
    this.carritoId = 0; // Inicializa con un valor por defecto
    this.clienteId = 0; // Inicializa con un valor por defecto
    this.articulos = [];
  }
}
