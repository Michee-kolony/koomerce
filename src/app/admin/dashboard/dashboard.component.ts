import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  urlarticle = "https://api-koomerce.shop/articles";
  urlcommande = "https://api-koomerce.shop/commande";

  totalCommandes = 0;
  totalUsers = 0; // (à brancher si tu as endpoint users)
  totalArticles = 0;
  commandesToday = 0;

  notifications: any[] = [];

  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  // 🔥 charger toutes les données en parallèle
  loadDashboard() {
    forkJoin({
      articles: this.http.get<any[]>(this.urlarticle),
      commandes: this.http.get<any[]>(this.urlcommande)
    }).subscribe({
      next: ({ articles, commandes }) => {

        // 🔥 TOTAL ARTICLES
        this.totalArticles = articles.length;

        // 🔥 TOTAL COMMANDES
        this.totalCommandes = commandes.length;

        // 🔥 COMMANDES AUJOURD’HUI
        const today = new Date().toDateString();

        this.commandesToday = commandes.filter(c =>
          new Date(c.createdAt).toDateString() === today
        ).length;

        // 🔥 NOTIFICATIONS (dernières commandes)
        this.notifications = commandes
          .sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
          .map(c => ({
            nom: c.nomclient,
            telephone: c.telephoneclient,
            time: this.timeAgo(c.createdAt)
          }));

        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur dashboard :", err);
        this.loading = false;
      }
    });
  }

  // 🔥 format temps
  timeAgo(date: string): string {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = Math.floor((now - past) / 1000);

    if (diff < 10) return "À l’instant";
    if (diff < 60) return `Il y a ${diff}s`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `Il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;

    const days = Math.floor(hours / 24);
    return `Il y a ${days} j`;
  }

}