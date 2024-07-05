import { Component } from '@angular/core';
import { Carrito } from '../../models/carrito.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: Carrito | null = null;
  clienteId = 1; // ID del cliente, ajustar según sea necesario

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.loadCarrito();
  }

  loadCarrito() {
    this.carritoService.getCarrito(this.clienteId).subscribe(data => {
      this.carrito = data;
    });
  }

  removeArticulo(articuloId: number) {
    this.carritoService.removeArticulo(this.clienteId, articuloId).subscribe(() => {
      this.loadCarrito();
    });
  }
}
