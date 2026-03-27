import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


   email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loading = true;
    // Logique de connexion ici
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

}
