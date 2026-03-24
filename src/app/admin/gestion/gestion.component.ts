import { Component, AfterViewInit } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'] // ✅ corrigé
})
export class GestionComponent implements AfterViewInit {

  searchTerm: string = '';

articles = [
  {
    id: 1,
    titre: 'Chaussures Sport',
    prix: 79.99,
    images: [
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg',
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
    ]
  },
  {
    id: 2,
    titre: 'Sac à Dos',
    prix: 49.99,
    images: [
      'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
      'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UL640_QL65_ML3_.jpg',
      'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
    ]
  },
  {
    id: 3,
    titre: 'Montre Connectée',
    prix: 129.99,
    images: [
      'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UL640_QL65_ML3_.jpg'
    ]
  }
];
  filteredArticles() {
    if (!this.searchTerm) return this.articles;
    return this.articles.filter(a =>
      a.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngAfterViewInit() {
    // Init Splide pour chaque article
    this.articles.forEach(article => {
      new Splide('#splide-' + article.id, {
        type: 'loop',
        perPage: 1,
        pagination: true,
        arrows: true,
        gap: '1rem'
      }).mount();
    });
  }
}