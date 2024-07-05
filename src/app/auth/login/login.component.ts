import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../interfaces/login_form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formSubmitted = false;


  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ){}


  public loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  login(){
    const formData: LoginForm = {

      email: this.loginForm.get('email')?.value as string,
      password: this.loginForm.get('password')?.value as string,
    };
    this.authService.login(formData).subscribe(resp =>{

    this.router.navigateByUrl('/dashboard');

    }, error => {
      console.error('Error en el inicio de sesión', error);
    });

  }

}
