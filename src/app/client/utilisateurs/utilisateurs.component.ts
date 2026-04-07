import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {

  urlclient = "https://api-koomerce.shop/client";

  utilisateurs: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
  this.http.get<any[]>(this.urlclient).subscribe({
    next: (data) => {

      // 🔥 TRI DU PLUS RÉCENT AU PLUS ANCIEN
      this.utilisateurs = data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      this.loading = false;
    },
    error: (err) => {
      console.error("Erreur chargement utilisateurs :", err);
      this.loading = false;
    }
  });
}

  // 🔥 format date
  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}