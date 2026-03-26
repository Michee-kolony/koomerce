import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Splide from '@splidejs/splide';

interface Article {
  _id: string;
  titre: string;
  prix: number;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  status: string;
  reduction: number;
  categorie: string;
  nomvendeur: string;
  telephonev: string;
  genre: string;
  prixReduit: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  urlapi = "https://api-koomerce.shop/articles";
  search = false;
  loading = true;

  articlesFemme: Article[] = [];
  articlesHomme: Article[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Récupérer les articles depuis l'API
    this.http.get<Article[]>(this.urlapi).subscribe(
      (data) => {
        this.articlesFemme = data.filter(a => a.genre.toLowerCase() === 'femme');
        this.articlesHomme = data.filter(a => a.genre.toLowerCase() === 'homme');

        // Initialiser les carrousels après rendu
        setTimeout(() => this.initProductCarousels(), 100);
        this.loading = false;
      },
      (err) => console.error('Erreur API:', err)
    );
  }

  ngAfterViewInit(): void {
    // HERO CAROUSEL
    new Splide('#hero-carousel', {
      type: 'loop',
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      arrows: false,
      pagination: true,
      speed: 1000
    }).mount();
  }

  launchsearch() {
    this.search = !this.search;
  }

  initProductCarousels() {
    // Carousel Femmes
    if (this.articlesFemme.length) {
      new Splide('#image-carousel', {
        type: 'loop',
        perPage: 3,
        gap: '1.5rem',
        autoplay: true,
        pauseOnHover: true,
        focus: 'center',
        pagination: false,
        breakpoints: {
          1024: { perPage: 3 },
          640: { perPage: 2 }
        }
      }).mount();
    }

    // Carousel Hommes
    if (this.articlesHomme.length) {
      new Splide('#image-carousel2', {
        type: 'loop',
        perPage: 3,
        gap: '1.5rem',
        autoplay: true,
        pauseOnHover: true,
        focus: 'center',
        pagination: false,
        breakpoints: {
          1024: { perPage: 3 },
          640: { perPage: 2 }
        }
      }).mount();
    }
  }
}