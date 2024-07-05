import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private base_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<{ message: string, clientes: Cliente[] }>(`${this.base_url}/clientes`).pipe(
      tap(response => {
        console.log('Clientes obtenidos:', response);
      }),
      map(response => response.clientes)
    );
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.base_url}/clientes/${id}`).pipe(
      tap(cliente => {
        console.log('Cliente obtenido:', cliente);
      })
    );
  }

  create(item: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.base_url}/clientes`, item).pipe(
      tap(cliente => {
        console.log('Cliente creado:', cliente);
      })
    );
  }

  update(id: number, item: Cliente): Observable<void> {
    return this.http.put<void>(`${this.base_url}/clientes/${id}`, item).pipe(
      tap(() => {
        console.log('Cliente actualizado:', item);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_url}/clientes/${id}`).pipe(
      tap(() => {
        console.log('Cliente eliminado:', id);
      })
    );
  }
}
