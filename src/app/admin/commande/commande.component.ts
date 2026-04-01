import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit, OnDestroy {

  url = "https://api-koomerce.shop/commande";

  searchTerm: string = '';

  commandes: any[] = [];
  loading: boolean = true;

  private refreshSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCommandes();

    // 🔥 AUTO REFRESH CHAQUE 10 SECONDES
    this.refreshSub = interval(10000).subscribe(() => {
      this.getCommandes();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  // 🔥 récupérer commandes backend
  getCommandes() {
    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {
        this.commandes = data;

        // 🔥 tri par date (plus récente en premier)
        this.commandes.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur API commandes :", err);
        this.loading = false;
      }
    });
  }

  // 🔥 recherche
  filteredCommandes() {
    if (!this.searchTerm) return this.commandes;

    return this.commandes.filter(c =>
      c.titre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.nomclient?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // 🔥 formatage temps "il y a ..."
  timeAgo(date: string): string {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = Math.floor((now - past) / 1000);

    if (diff < 10) return "à l’instant";
    if (diff < 60) return `il y a ${diff}s`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `il y a ${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours}h`;

    const days = Math.floor(hours / 24);
    return `il y a ${days}j`;
  }
}