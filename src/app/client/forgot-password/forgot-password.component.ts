import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email: string = '';
  loading: boolean = false;

  // POPUPS
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.email || this.loading) return;

    this.loading = true;
    this.showErrorPopup = false;
    this.showSuccessPopup = false;

    this.http.post('https://api-koomerce.shop/client/forgot-password', {
      email: this.email
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.successMessage =
          res?.message || "📩 Email de réinitialisation envoyé avec succès !";

        this.showSuccessPopup = true;
        this.email = '';
      },

      error: (err) => {
        this.loading = false;

        this.errorMessage =
          err?.error?.message || "❌ Une erreur est survenue.";

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