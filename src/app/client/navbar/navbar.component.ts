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

  url = "https://api-koomerce.shop/articles"; // ton API
  search = false;
  filterCategorie = '';
  searchQuery = '';
  produits: Produit[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProduits();
  }

  // Méthode launchSearch comme tu voulais
  launchsearch(){
    this.search = !this.search;
    this.searchQuery = '';
    this.filterCategorie = '';
  }

  // Récupérer les produits depuis l'API
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

  // Retourne les produits filtrés
  get produitsFiltres(): Produit[] {
    return this.produits.filter(p => {
      const matchNom = p.titre.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCategorie ? p.categorie === this.filterCategorie : true;
      return matchNom && matchCat;
    });
  }
}