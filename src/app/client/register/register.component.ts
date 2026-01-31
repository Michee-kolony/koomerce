import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
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
