import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url = "https://api-koomerce.shop/articles";
  search = false;
  filterCategorie = '';
  searchQuery = '';
  produits: Produit[] = [];

  // 👇 USER CONNECTÉ
  user: any = null;
  initial: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProduits();
    this.loadUser();
  }

  // 🔥 Charger user depuis localStorage
  loadUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      // initiale du nom ou email
      const name = this.user?.nom || this.user?.name || this.user?.email || '';
      this.initial = name.charAt(0).toUpperCase();
    } else {
      this.user = null;
      this.initial = '';
    }
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
        console.error("Erreur lors de la récupération des produits :", err);
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

  // 🔥 logout optionnel
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.initial = '';
  }
}