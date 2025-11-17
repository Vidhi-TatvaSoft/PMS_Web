import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../../core/models/login-model';
import { ReusableButtonComponent } from '../../reusable-components/reusable-button-component/reusable-button-component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login/login-service';
import { ApiResponse } from '../../../core/models/api-response';
import { Router } from '@angular/router';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { getCookie } from '../../../core/common-methods/cookie-helper';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, ReusableButtonComponent, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  login: LoginModel = {
    email: '',
    password: ''
  }

  loginMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: CustomToasterService,
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.login)
      const formData = new FormData();

      formData.append('EmailAddress', this.login.email);
      formData.append('Password', this.login.password);
      this.loginService.login(formData).subscribe({
        next: (data: ApiResponse<string>) => {

          if (data.isSuccess) {
            // sessionStorage.setItem('authToken', JSON.stringify(data.token));
            document.cookie = `authToken=${data.token}; path=/; max-age=86400`; // 1 day
            this.router.navigate(['/dashboard']);
          } else {
            this.toast.error(data.message)
          }
        },
        error: (err) => console.error('API Error:', err)
      })
    } else {
      form.form.markAllAsTouched();
    }
  }
}
