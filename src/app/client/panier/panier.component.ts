import { Component, OnInit } from '@angular/core';

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

  produits: Produit[] = [
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
    },
    {
      id: 3,
      nom: 'Montre élégante',
      prix: 150,
      quantite: 1,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552'
    },
    {
      id: 4,
      nom: 'Casque audio',
      prix: 60,
      quantite: 1,
      image: 'https://images.unsplash.com/photo-1518441902110-9f0f8a0c89b8'
    },
    {
      id: 5,
      nom: 'T-shirt tendance',
      prix: 25,
      quantite: 3,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    }
  ];


  ngOnInit(): void {
         // Scroll automatique en haut de la page
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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