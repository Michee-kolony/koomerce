import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nom: string = '';
  email: string = '';
  telephone: string = '';
  adresse: string = '';
  password: string = '';

  showPassword: boolean = false;
  loading: boolean = false;

  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  url = "https://api-koomerce.shop/client/register";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {

    // 🔥 VALIDATION SIMPLE
    if (!this.nom || !this.email || !this.telephone || !this.adresse || !this.password) {
      this.errorMessage = "Champs sont obligatoires";
      this.showErrorPopup = true;
      return;
    }

    this.loading = true;
    this.showErrorPopup = false;
    this.showSuccessPopup = false;

    const body = {
      nom: this.nom,
      email: this.email,
      telephone: this.telephone,
      adresse: this.adresse,
      motdepasse: this.password
    };

    this.http.post(this.url, body).subscribe({
      next: (res: any) => {

        this.loading = false;

        this.successMessage = "Inscription réussie ✔️";
        this.showSuccessPopup = true;

        // redirection après 5 secondes
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },

      error: (err) => {
        this.loading = false;

        this.errorMessage =
          err?.error?.message || "Erreur lors de l'inscription";

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