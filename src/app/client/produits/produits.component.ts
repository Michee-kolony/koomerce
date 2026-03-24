import { Component } from '@angular/core';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {

  produits = [
    {
      nom: "Robe élégante femme",
      prix: 25,
      ancienPrix: 40,
      promo: 35,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
    },
    {
      nom: "T-shirt casual tendance",
      prix: 12,
      ancienPrix: 20,
      promo: 40,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
      nom: "Chaussures sneakers blanches",
      prix: 35,
      ancienPrix: 50,
      promo: 30,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      nom: "Sac à main luxe",
      prix: 18,
      ancienPrix: 30,
      promo: 20,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },
    {
      nom: "Jean slim homme",
      prix: 22,
      ancienPrix: 35,
      promo: 25,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    },
    {
      nom: "Veste streetwear",
      prix: 45,
      ancienPrix: 60,
      promo: 15,
      image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef"
    },
    {
      nom: "Montre moderne",
      prix: 28,
      ancienPrix: 45,
      promo: 20,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      nom: "Lunettes fashion",
      prix: 10,
      ancienPrix: 18,
      promo: 10,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    }
  ];

}