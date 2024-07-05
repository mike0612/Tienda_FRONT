import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterForm } from '../interfaces/register_form';
import { LoginForm } from '../interfaces/login_form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private base_url = environment.api_url;


  constructor(private http: HttpClient) { }


  register(registerData: RegisterForm) {
    return this.http.post(`${this.base_url}/auth/register`, registerData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/auth/login`, formData).pipe(
      tap((resp: any) => {
        console.log('Login response:', resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}
