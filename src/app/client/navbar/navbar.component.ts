import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface Produit {
  _id?: string;
  titre: string;
  prix: number;
  prixReduit?: number;
  image1: string;
  image2?: string;
  image3?: string;
  categorie: string;
  genre: string;
}

interface Panier {
  _id?: string;
  userId: string;
  produitId: string;
  titre: string;
  prixReduit: number;
  image: string;
  quantite: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  url = "https://api-koomerce.shop/articles";
  urlPanier = "https://api-koomerce.shop/panier";

  search = false;
  filterCategorie = '';
  searchQuery = '';
  produits: Produit[] = [];

  // 🔥 USER
  user: any = null;
  initial: string = '';

  // 🔥 PANIER
  panier: Panier[] = [];
  panierCount: number = 0;

  // 🔥 RXJS
  panierSubscription!: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProduits();
    this.loadUser();

    // 🔥 REFRESH AUTO toutes les 3 secondes
    this.panierSubscription = interval(3000).subscribe(() => {
      if (this.user) {
        this.getPanier();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.panierSubscription) {
      this.panierSubscription.unsubscribe();
    }
  }

  // 🔥 Charger user
  loadUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      const name = this.user?.nom || this.user?.name || this.user?.email || '';
      this.initial = name.charAt(0).toUpperCase();

      // 🔥 première charge panier
      this.getPanier();
    } else {
      this.user = null;
      this.initial = '';
      this.panierCount = 0;
    }
  }

  // 🔥 GET PANIER
  getPanier() {
    this.http.get<Panier[]>(this.urlPanier).subscribe({
      next: (res) => {
        this.panier = res;

        const userPanier = this.panier.filter(p => p.userId === this.user._id);

        this.panierCount = userPanier.reduce(
          (total, item) => total + item.quantite,
          0
        );
      },
      error: (err) => {
        console.error("Erreur panier :", err);
      }
    });
  }

  launchsearch() {
    this.search = !this.search;
    this.searchQuery = '';
    this.filterCategorie = '';
  }

  getProduits() {
    this.http.get<Produit[]>(this.url).subscribe({
      next: (res) => {
        this.produits = res;
      },
      error: (err) => {
        console.error("Erreur produits :", err);
      }
    });
  }

  get produitsFiltres(): Produit[] {
    return this.produits.filter(p => {
      const matchNom = p.titre.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCategorie ? p.categorie === this.filterCategorie : true;
      return matchNom && matchCat;
    });
  }

  // 🔥 LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.user = null;
    this.initial = '';
    this.panierCount = 0;
  }
}