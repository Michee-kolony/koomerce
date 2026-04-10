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
  loading: boolean = true;

  private socket!: WebSocket;

  // 🔔 Notification UI
  notification: string = '';
  notificationImage: string = '';
  showNotification: boolean = false;

  // 🔊 AUDIO
  private audio = new Audio('/notifications.mp3');
  private audioUnlocked = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.loadProduits();
    this.connectWebSocket();

    // 🔓 IMPORTANT : débloquer audio avec vraie interaction
    this.forceUnlockAudio();
  }

  // =========================
  // 🔓 AUDIO UNLOCK ULTRA FIABLE
  // =========================
  forceUnlockAudio() {

    const events = ['click', 'touchstart', 'keydown'];

    const unlock = () => {

      if (this.audioUnlocked) return;

      const testAudio = new Audio('/notifications.mp3');

      testAudio.play()
        .then(() => {
          testAudio.pause();
          testAudio.currentTime = 0;

          this.audioUnlocked = true;
          console.log("🔊 AUDIO DÉBLOQUÉ ✔");

          // 🔥 supprimer listeners après unlock
          events.forEach(e => document.removeEventListener(e, unlock));
        })
        .catch(() => {
          // silencieux
        });
    };

    // 🔥 écouter plusieurs types d'interaction (très important)
    events.forEach(e => {
      document.addEventListener(e, unlock, { once: true });
    });
  }

  // =========================
  // 📦 Charger produits API
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

        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur API :", err);
        this.loading = false;
      }
    });
  }

  // =========================
  // 🔌 WEBSOCKET
  // =========================
  connectWebSocket() {

    this.socket = new WebSocket("wss://api-koomerce.shop/");

    this.socket.onopen = () => {
      console.log("🟢 WebSocket connecté");
    };

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

        // 🔥 Ajouter en haut
        this.produits.unshift(produit);

        // 🔔 notification UI
        this.showNotif(`🆕 ${article.titre}`, article.image1);

        // 🔊 son sécurisé
        this.playNotificationSound();
      }
    };

    this.socket.onclose = () => {
      console.log("🔴 WebSocket fermé");
    };
  }

  // =========================
  // 🔊 SON SAFE
  // =========================
  playNotificationSound() {

    if (!this.audioUnlocked) {
      console.log("🔇 Audio bloqué (pas encore unlock)");
      return;
    }

    this.audio.currentTime = 0;

    this.audio.play().catch(err => {
      console.log("Son bloqué :", err);
    });
  }

  // =========================
  // 🔔 NOTIFICATION UI
  // =========================
  showNotif(message: string, image?: string) {

    this.notification = message;
    this.notificationImage = image || '';
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3500);
  }
}