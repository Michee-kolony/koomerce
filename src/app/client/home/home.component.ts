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
  createdAt: string;
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

  // 🔥 HERO DATA
  heroArticles: Article[] = [];

  private heroInitialized = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.http.get<Article[]>(this.urlapi).subscribe(
      (data) => {

        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        this.articlesFemme = sorted.filter(
          a => a.genre.toLowerCase() === 'femme'
        );

        this.articlesHomme = sorted.filter(
          a => a.genre.toLowerCase() === 'homme'
        );

        // 🔥 HERO = produits en réduction 50%
        this.heroArticles = sorted.filter(
          a => a.reduction === 50
        );

        this.loading = false;

        // ⚠️ IMPORTANT: attendre DOM Angular
        setTimeout(() => {
          this.initHero();
          this.initProductCarousels();
        }, 200);
      },
      (err) => console.error('Erreur API:', err)
    );
  }

  ngAfterViewInit(): void {
    // ne rien init ici pour éviter conflit Angular + Splide
  }

  launchsearch() {
    this.search = !this.search;
  }

  // ================= HERO SPLIDE =================
  initHero() {

    if (this.heroInitialized) return;
    this.heroInitialized = true;

    const el = document.getElementById('hero-carousel');

    if (!el) return;

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

  // ================= AUTRES CAROUSELS =================
  initProductCarousels() {

    if (this.articlesFemme.length) {
      new Splide('#image-carousel', {
        type: 'loop',
        perPage: 3,
        gap: '1.5rem',
        autoplay: true,
        pauseOnHover: true,
        pagination: false,
        breakpoints: {
          1024: { perPage: 3 },
          640: { perPage: 2 }
        }
      }).mount();
    }

    if (this.articlesHomme.length) {
      new Splide('#image-carousel2', {
        type: 'loop',
        perPage: 3,
        gap: '1.5rem',
        autoplay: true,
        pauseOnHover: true,
        pagination: false,
        breakpoints: {
          1024: { perPage: 3 },
          640: { perPage: 2 }
        }
      }).mount();
    }
  }
}