import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']  // corrigé : styleUrls au lieu de styleUrl
})
export class ProduitsComponent implements OnInit {

  url = "https://api-koomerce.shop/articles";
  produits: any[] = [];  // tableau vide au départ
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Scroll automatique en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Récupérer tous les produits depuis l'API
this.http.get<any[]>(this.url).subscribe({
  next: (data) => {
    // Trier par date décroissante : le plus récent en premier
    const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.loading = false;
    // On map pour utiliser les bons champs pour l'affichage
    this.produits = sorted.map(p => ({
      _id:p._id,
      nom: p.titre,
      prix: p.prixReduit || p.prix,
      ancienPrix: p.prix !== p.prixReduit ? p.prix : null,
      promo: p.reduction,
      image: p.image1  // on prend la première image
    }));
  },
  error: (err) => console.error("Erreur API :", err)
});
   
  }
}