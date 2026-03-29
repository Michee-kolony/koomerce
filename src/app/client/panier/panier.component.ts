import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Produit {
  _id: string;
  userId: string;
  produitId: string;
  titre: string;
  prixReduit: number;
  image: string;
  quantite: number;
  nomvendeur: string;
  telephonev: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {

  produits: Produit[] = [];
  loading  = true;

  // 🔥 USER
  user: any = null;
  userId: string | null = null;

  // 🔥 API
  urlpanier = "https://api-koomerce.shop/panier";

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.loadUser();

    if (this.userId) {
      this.loadPanier();
    }
  }

  // 🔥 LOAD USER
  loadUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?._id || null;
      console.log("User connecté:", this.user);

      // 🔥 IMPORTANT : charger panier après user
      this.loadPanier();
    } else {
      this.user = null;
      this.userId = null;
    }
  }

  // 🔥 LOAD PANIER
  loadPanier() {
    this.http.get<Produit[]>(this.urlpanier).subscribe(
      (data) => {
        this.produits = data.filter(p => p.userId === this.userId);
        this.loading = false;
      },
      (err) => {
        console.error("Erreur panier:", err);
      }
    );
  }

  // 🔥 LOGIN REDIRECT
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // 🔥 TOTAL
  getTotal(): number {
    return this.produits.reduce((total, produit) => {
      return total + (produit.prixReduit * produit.quantite);
    }, 0);
  }

  // 🔥 QUANTITE
  augmenterQuantite(produit: Produit) {
    produit.quantite++;
  }

  diminuerQuantite(produit: Produit) {
    if (produit.quantite > 1) {
      produit.quantite--;
    }
  }

  // 🔥 SUPPRESSION DYNAMIQUE API
  supprimerProduit(id: string) {
    this.http.delete(`${this.urlpanier}/${id}`).subscribe(
      () => {
        console.log("Produit supprimé:", id);

        // 🔥 mise à jour UI sans reload
        this.produits = this.produits.filter(p => p._id !== id);
      },
      (err) => {
        console.error("Erreur suppression:", err);
      }
    );
  }
}