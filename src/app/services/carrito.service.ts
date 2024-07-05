import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../models/carrito.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private baseUrl = `${environment.api_url}/carrito`;

  constructor(private http: HttpClient) {}

  getCarrito(clienteId: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/${clienteId}`);
  }

  addArticulo(clienteId: number, articuloId: number, cantidad: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${clienteId}/articulos/${articuloId}`, { cantidad });
  }

  removeArticulo(clienteId: number, articuloId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${clienteId}/articulos/${articuloId}`);
  }
}
