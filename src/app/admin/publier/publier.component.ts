import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent {
  url = "https://api-koomerce.shop/articles";

  loading = false;
  successMessage = '';
  errorMessage = '';

  article = {
    titre: '',
    prix: null,
    reduction: 0,
    description: '',
    image1: '',
    image2: '',
    image3: '',
    status: 'neuf(ve)',
    categorie: '',  // ⚡ corrigé
    nomvendeur: '',
    telephonev: '',
    genre: ''
  };

  constructor(private http: HttpClient) {}

  submitArticle() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post(this.url, this.article).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Article publié avec succès !';
        // Réinitialiser le formulaire
        this.article = {
          titre: '',
          prix: null,
          reduction: 0,
          description: '',
          image1: '',
          image2: '',
          image3: '',
          status: 'neuf(ve)',
          categorie: '',
          nomvendeur: '',
          telephonev: '',
          genre: ''
        };
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la publication. Vérifiez vos champs.';
        console.error(err);
      }
    });
  }
}