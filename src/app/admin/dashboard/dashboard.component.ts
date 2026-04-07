import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  urlarticle = "https://api-koomerce.shop/articles";
  urlcommande = "https://api-koomerce.shop/commande";
  urlclient = "https://api-koomerce.shop/client";

  totalCommandes = 0;
  totalUsers = 0;
  totalArticles = 0;
  commandesToday = 0;

  notifications: any[] = [];
  loading: boolean = true;

  private intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboard();

    // 🔥 auto refresh toutes les 10 sec
    this.intervalId = setInterval(() => {
      this.loadDashboard();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // 🔥 fonction principale (simple et fiable)
  loadDashboard() {
    forkJoin({
      articles: this.http.get<any[]>(this.urlarticle),
      commandes: this.http.get<any[]>(this.urlcommande),
      clients: this.http.get<any[]>(this.urlclient) // ✅ USERS
    }).subscribe({
      next: ({ articles, commandes, clients }) => {

        // 🔥 TOTALS
        this.totalArticles = articles?.length || 0;
        this.totalCommandes = commandes?.length || 0;
        this.totalUsers = clients?.length || 0;

        // 🔥 COMMANDES AUJOURD’HUI
        const today = new Date().toDateString();

        this.commandesToday = commandes.filter(c =>
          new Date(c.createdAt).toDateString() === today
        ).length;

        // 🔥 NOTIFICATIONS
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
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

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