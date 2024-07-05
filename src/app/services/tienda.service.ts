import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../models/tienda.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private base_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tienda[]> {
    return this.http.get<{ message: string, tiendas: Tienda[] }>(`${this.base_url}/tiendas`).pipe(
      tap(response => {
        console.log('Tiendas obtenidas:', response);
      }),
      map(response => response.tiendas)
    );
  }

  getById(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.base_url}/tiendas/${id}`).pipe(
      tap(tienda => {
        console.log('Tienda obtenida:', tienda);
      })
    );
  }

  create(item: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(`${this.base_url}/tiendas`, item).pipe(
      tap(tienda => {
        console.log('Tienda creada:', tienda);
      })
    );
  }

  update(id: number, item: Tienda): Observable<void> {
    return this.http.put<void>(`${this.base_url}/tiendas/${id}`, item).pipe(
      tap(() => {
        console.log('Tienda actualizada:', item);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_url}/tiendas/${id}`).pipe(
      tap(() => {
        console.log('Tienda eliminada:', id);
      })
    );
  }
}
