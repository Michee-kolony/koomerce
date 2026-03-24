import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 
  search = false;

  produits = [
  {
    nom: "Robe élégante",
    prix: 25,
    ancienPrix: 40,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
  },
  {
    nom: "T-shirt streetwear",
    prix: 12,
    ancienPrix: 20,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    nom: "Sneakers modernes",
    prix: 35,
    ancienPrix: 50,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    nom: "Sac tendance",
    prix: 18,
    ancienPrix: 30,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
  }
];


launchsearch(){
  this.search = !this.search
}
}
