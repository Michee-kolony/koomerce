import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produit {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
  image: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {

  produits: Produit[] = [];

  // 🔥 USER
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadUser();

    // 👉 charger panier SEULEMENT si connecté
    if (this.user) {
      this.loadPanier();
    }
  }

  // 🔥 LOAD USER
  loadUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  // 🔥 SIMULATION PANIER (à remplacer par API plus tard)
  loadPanier() {
    this.produits = [
      {
        id: 1,
        nom: 'Sneakers Nike',
        prix: 120,
        quantite: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
      },
      {
        id: 2,
        nom: 'Sac à main cuir',
        prix: 80,
        quantite: 2,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3'
      }
    ];
  }

  // 🔥 REDIRECTION LOGIN
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // 🔥 LOGIQUE PANIER
  getTotal(): number {
    return this.produits.reduce((total, produit) => {
      return total + (produit.prix * produit.quantite);
    }, 0);
  }

  augmenterQuantite(produit: Produit) {
    produit.quantite++;
  }

  diminuerQuantite(produit: Produit) {
    if (produit.quantite > 1) {
      produit.quantite--;
    }
  }

  supprimerProduit(id: number) {
    this.produits = this.produits.filter(p => p.id !== id);
  }
}