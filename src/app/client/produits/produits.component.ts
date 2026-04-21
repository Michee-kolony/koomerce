import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  url = "https://api-koomerce.shop/articles";

  produits: any[] = [];
  paginatedProduits: any[] = [];

  loading: boolean = true;

  // 🔥 PAGINATION
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  pages: number[] = [];

  private socket!: WebSocket;

  notification: string = '';
  notificationImage: string = '';
  showNotification: boolean = false;

  private audio = new Audio('/notifications.mp3');
  private audioUnlocked = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProduits();
    this.connectWebSocket();
    this.forceUnlockAudio();
  }

  // =========================
  // 📦 LOAD API
  // =========================
  loadProduits() {
    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.produits = sorted.map(p => ({
          _id: p._id,
          nom: p.titre,
          prix: p.prixReduit || p.prix,
          ancienPrix: p.prix !== p.prixReduit ? p.prix : null,
          promo: p.reduction,
          image: p.image1
        }));

        this.setupPagination();
        this.loading = false;
      }
    });
  }

  // =========================
  // 🔥 PAGINATION LOGIC
  // =========================
  setupPagination() {
    this.totalPages = Math.ceil(this.produits.length / this.itemsPerPage);
    this.generatePages();
    this.updatePaginatedProduits();
  }

  generatePages() {
    const maxVisible = 5;
    const pages: number[] = [];

    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.pages = pages;
  }

  updatePaginatedProduits() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.paginatedProduits = this.produits.slice(start, end);
    this.generatePages();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProduits();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProduits();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProduits();
    }
  }

  // =========================
  // 🔌 WEBSOCKET
  // =========================
  connectWebSocket() {

    this.socket = new WebSocket("wss://api-koomerce.shop/");

    this.socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data.type === "NEW_ARTICLE") {

        const article = data.data;

        const produit = {
          _id: article._id,
          nom: article.titre,
          prix: article.prixReduit || article.prix,
          ancienPrix: article.prix !== article.prixReduit ? article.prix : null,
          promo: article.reduction,
          image: article.image1
        };

        this.produits.unshift(produit);

        this.setupPagination();

        this.showNotif(`🆕 ${article.titre}`, article.image1);
        this.playNotificationSound();
      }
    };
  }

  // =========================
  // 🔊 AUDIO
  // =========================
  forceUnlockAudio() {
    const unlock = () => {
      if (this.audioUnlocked) return;

      this.audio.play().then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audioUnlocked = true;
      }).catch(() => {});
    };

    document.addEventListener('click', unlock, { once: true });
  }

  playNotificationSound() {
    if (!this.audioUnlocked) return;

    this.audio.currentTime = 0;
    this.audio.play().catch(() => {});
  }

  // =========================
  // 🔔 NOTIF
  // =========================
  showNotif(message: string, image?: string) {
    this.notification = message;
    this.notificationImage = image || '';
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}