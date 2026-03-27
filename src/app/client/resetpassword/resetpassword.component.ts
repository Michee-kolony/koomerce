import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  token: string = '';

  password: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  loading: boolean = false;

  // POPUPS
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔥 récupération du token depuis l'URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
    console.log("TOKEN RÉCUPÉRÉ :", this.token);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    // ❌ validation champs vides
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = "Veuillez remplir tous les champs";
      this.showErrorPopup = true;
      return;
    }

    // ❌ validation mots de passe identiques
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne sont pas identiques";
      this.showErrorPopup = true;
      return;
    }

    this.loading = true;
    this.showErrorPopup = false;
    this.showSuccessPopup = false;

    // 🔥 appel backend
    this.http.post(
      `https://api-koomerce.shop/client/reset-password/${this.token}`,
      {
         motdepasse: this.password
      }
    ).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.successMessage =
          res?.message || "Mot de passe modifié avec succès ✔️";
          setTimeout(()=>{

            this.router.navigate(['/login']);
          }, 2000);

        this.showSuccessPopup = true;

        // reset form
        this.password = '';
        this.confirmPassword = '';
      },

      error: (err) => {
        this.loading = false;

        this.errorMessage =
          err?.error?.message || "Erreur lors de la réinitialisation";

        this.showErrorPopup = true;
      }
    });
  }

  closeSuccess(): void {
    this.showSuccessPopup = false;
  }

  closeError(): void {
    this.showErrorPopup = false;
  }
}