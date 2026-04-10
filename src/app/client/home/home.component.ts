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

  heroArticles: Article[] = [];

  private heroInitialized = false;

  // 🔔 NOTIFICATION SYSTEM
  showNotification = false;
  notification = '';
  notificationImage = '';
  private reminderTimer: any;

  // 🔥 NOUVEAU : dernier article global
  latestArticle: Article | null = null;

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

        // 🔥 LE PLUS IMPORTANT : dernier article global
        this.latestArticle = sorted[0] || null;

        this.articlesFemme = sorted.filter(
          a => a.genre.toLowerCase() === 'femme'
        );

        this.articlesHomme = sorted.filter(
          a => a.genre.toLowerCase() === 'homme'
        );

        this.heroArticles = sorted.filter(
          a => a.reduction === 50
        );

        this.loading = false;

        setTimeout(() => {
          this.initHero();
          this.initProductCarousels();
        }, 200);

        this.startReminderTimer();
      },
      (err) => console.error('Erreur API:', err)
    );
  }

  ngAfterViewInit(): void {}

  launchsearch() {
    this.search = !this.search;
  }

  // ================= HERO =================
  initHero() {

    if (this.heroInitialized) return;
    this.heroInitialized = true;

    const el = document.getElementById('hero-carousel');

    if (!el) return;

    new Splide('#hero-carousel', {
      type: 'fade',
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      arrows: false,
      pagination: true,
      speed: 1000
    }).mount();
  }

  // ================= CAROUSELS =================
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

  // ================= ⏰ 1 MIN TIMER =================
  startReminderTimer() {

    if (this.reminderTimer) {
      clearTimeout(this.reminderTimer);
    }

    this.reminderTimer = setTimeout(() => {
      this.sendArticleReminder();
    }, 60 * 1000);
  }

  // ================= 🔔 TOAST =================
  sendArticleReminder() {

    const article = this.latestArticle;

    if (!article) return;

    this.notification = `Nouvel article : ${article.titre}`;
    this.notificationImage = article.image1;

    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 5000);

    this.startReminderTimer();
  }
}