import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  // POPUPS
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  url = "https://api-koomerce.shop/client/login";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {

    if (!this.email || !this.password) {
      this.errorMessage = "Veuillez remplir tous les champs";
      this.showErrorPopup = true;
      return;
    }

    this.loading = true;
    this.showErrorPopup = false;
    this.showSuccessPopup = false;

    this.http.post(this.url, {
      email: this.email,
      motdepasse: this.password
    }).subscribe({
      next: (res: any) => {

        this.loading = false;

        // 🔥 STOCKAGE LOCALSTORAGE
        localStorage.setItem("user_token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        this.successMessage = "Connexion réussie";
        this.showSuccessPopup = true;

        // redirection après 1.5s
        setTimeout(() => {
          this.router.navigate(['/koomerce/home']);
        }, 1500);
      },

      error: (err) => {
        this.loading = false;

        this.errorMessage =
          err?.error?.message || "Email ou mot de passe incorrect";

        this.showErrorPopup = true;
      }
    });
  }

  closeSuccess() {
    this.showSuccessPopup = false;
  }

  closeError() {
    this.showErrorPopup = false;
  }
}