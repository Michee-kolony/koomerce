import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mescommandes',
  templateUrl: './mescommandes.component.html',
  styleUrls: ['./mescommandes.component.css']
})
export class MescommandesComponent implements OnInit {

  urlcommandes = "https://api-koomerce.shop/commande";

  commandes: any[] = [];
  loading = true;
  userId: string = '';

  // 🔥 MODALE STATE
  showModal = false;
  selectedCommandeId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
    this.getCommandes();
  }

  // USER
  getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userId = parsedUser._id;
    }
  }

  // GET COMMANDES
  getCommandes() {
    this.http.get<any[]>(this.urlcommandes).subscribe({
      next: (res) => {

        this.commandes = res
          .filter(cmd => cmd.clientId === this.userId)
          .map(cmd => ({
            ...cmd,
            dateObj: new Date(cmd.createdAt)
          }))
          .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 OUVRIR MODALE
  openModal(id: string) {
    this.selectedCommandeId = id;
    this.showModal = true;
  }

  // 🔥 FERMER MODALE
  closeModal() {
    this.showModal = false;
    this.selectedCommandeId = null;
  }

  // 🔥 CONFIRMER SUPPRESSION
  confirmDelete() {
    if (!this.selectedCommandeId) return;

    this.http.delete(`${this.urlcommandes}/${this.selectedCommandeId}`)
      .subscribe({
        next: () => {

          this.commandes = this.commandes.filter(
            cmd => cmd._id !== this.selectedCommandeId
          );

          this.closeModal();
        },
        error: (err) => {
          console.error("Erreur suppression :", err);
          this.closeModal();
        }
      });
  }

}