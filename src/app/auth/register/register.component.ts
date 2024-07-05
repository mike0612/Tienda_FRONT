import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;
  public RegisterForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.RegisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  register() {
    this.formSubmitted = true;

    if (this.RegisterForm.invalid) {
      if (this.passwordsMismatch) {
        alert('Las contraseñas no coinciden');
      }
      return;
    }

    const formData = {
      email: this.RegisterForm.get('email')?.value as string,
      password: this.RegisterForm.get('password')?.value as string
    };

    this.authService.register(formData).subscribe(resp => {
      console.log('Register response:', resp);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.error('Error en el registro', error);
      alert(`Error: ${error.error}`);
    });
  }

  get email() {
    return this.RegisterForm.get('email');
  }

  get password() {
    return this.RegisterForm.get('password');
  }

  get confirmPassword() {
    return this.RegisterForm.get('confirmPassword');
  }

  get passwordsMismatch() {
    return this.RegisterForm.errors?.['passwordsMismatch'];
  }
}
