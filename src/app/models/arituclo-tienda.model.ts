import { Articulo } from "./articulo.model";
import { Cliente } from "./cliente.model";
import { Tienda } from "./tienda.model";

export interface ArticuloTienda {
  articuloId: number;
  articulo: Articulo;
  tiendaId: number;
  tienda: Tienda;
  fecha: Date;
}

export interface ClienteArticulo {
  clienteId: number;
  cliente: Cliente;
  articuloId: number;
  articulo: Articulo;
  fecha: Date;
}
export interface Carrito {
  carritoId: number;
  clienteId: number;
  cliente: Cliente;
  carritoArticulos: CarritoArticulo[];
}

export interface CarritoArticulo {
  carritoId: number;
  carrito: Carrito;
  articuloId: number;
  articulo: Articulo;
  cantidad: number;
}
