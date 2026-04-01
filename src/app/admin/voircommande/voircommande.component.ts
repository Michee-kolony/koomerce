import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voircommande',
  templateUrl: './voircommande.component.html',
  styleUrl: './voircommande.component.css'
})
export class VoircommandeComponent implements OnInit {

  urlcommande = "https://api-koomerce.shop/commande";

  commande: any = null;
  loading: boolean = true;

  statusOptions = ['En attente', 'En cours', 'Livrée'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getCommandeById(id);
    }
  }

  // 🔥 GET BY ID
  getCommandeById(id: string) {
    this.http.get<any>(`${this.urlcommande}/${id}`).subscribe({
      next: (data) => {
        this.commande = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 UPDATE STATUS
  updateStatus(newStatus: string) {
    if (!this.commande) return;

    const updated = {
      ...this.commande,
      status: newStatus
    };

    this.http.put(`${this.urlcommande}/${this.commande._id}`, updated)
      .subscribe({
        next: (res) => {
          this.commande.status = newStatus;
          alert("Status mis à jour !");
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      });
  }

  // 🔥 DELETE COMMANDE
  deleteCommande() {
    if (!this.commande) return;

    const confirmDelete = confirm("Voulez-vous vraiment supprimer cette commande ?");

    if (!confirmDelete) return;

    this.http.delete(`${this.urlcommande}/${this.commande._id}`)
      .subscribe({
        next: () => {
          alert("Commande supprimée !");
          window.history.back();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur suppression");
        }
      });
  }

  // 🔥 TIME AGO
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