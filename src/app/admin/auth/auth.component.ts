import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  // POPUPS
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  urllogin = "https://api-koomerce.shop/auth/login";

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

    this.http.post(this.urllogin, {
      email: this.email,
      password: this.password
    }).subscribe({

      next: (res: any) => {

        this.loading = false;

        // 🔥 TOKEN ADMIN
        localStorage.setItem("admin_token", res.token);

        // 🔥 USER ADMIN (corrigé selon backend)
        localStorage.setItem("admin_user", JSON.stringify({
          id: res.adminId,
          nom: res.nom,
          email: res.email
        }));

        this.successMessage = "Connexion admin réussie";
        this.showSuccessPopup = true;

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
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