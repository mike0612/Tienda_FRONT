import { ArticuloTienda, ClienteArticulo } from './arituclo-tienda.model';


export class Articulo {

  articuloId: number ;
  codigo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  articuloTiendas: ArticuloTienda[];

  constructor() {
    this.articuloId = 0;
    this.codigo = '';
    this.descripcion = '';
    this.precio = 0;
    this.imagen = '';
    this.stock = 0;
    this.articuloTiendas = [];
  }
}
