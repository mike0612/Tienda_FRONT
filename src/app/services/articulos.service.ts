import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Articulo } from '../models/articulo.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private base_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Articulo[]> {
    return this.http.get<{ message: string, articulos: Articulo[] }>(`${this.base_url}/articulos`).pipe(
      tap(response => {
        console.log('Articulos obtenidos:', response);
      }),
      map(response => response.articulos)
    );
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.base_url}/articulos/${id}`).pipe(
      tap(articulo => {
        console.log('Articulo obtenido:', articulo);
      })
    );
  }

  create(item: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(`${this.base_url}/articulos`, item).pipe(
      tap(articulo => {
        console.log('Articulo creado:', articulo);
      })
    );
  }

  update(id: number, item: Articulo): Observable<void> {
    return this.http.put<void>(`${this.base_url}/articulos/${id}`, item).pipe(
      tap(() => {
        console.log('Articulo actualizado:', item);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_url}/articulos/${id}`).pipe(
      tap(() => {
        console.log('Articulo eliminado:', id);
      })
    );
  }
}
