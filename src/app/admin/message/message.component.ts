import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Contact {
  _id: string;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'] // ✅ corrigé
})
export class MessageComponent implements OnInit {

  url = "https://api-koomerce.shop/contact";

  messages: Contact[] = [];
  filteredMessages: Contact[] = [];

  searchText: string = '';
  loading = true;
  deletingId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;

    this.http.get<Contact[]>(this.url).subscribe({
      next: (data) => {

        // 🔥 tri du plus récent au plus ancien
        this.messages = data.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.filteredMessages = [...this.messages];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔎 recherche dynamique
  filterMessages() {
    const text = this.searchText.toLowerCase();

    this.filteredMessages = this.messages.filter(msg =>
      msg.nom.toLowerCase().includes(text) ||
      msg.email.toLowerCase().includes(text) ||
      msg.sujet.toLowerCase().includes(text) ||
      msg.message.toLowerCase().includes(text)
    );
  }

getTimeAgo(date: string): string {

  if (!date) return "date inconnue";

  const created = new Date(date);
  const now = new Date();

  // 🔥 corrige le décalage UTC → local
  const diff = now.getTime() - created.getTime();

  if (diff < 0) return "à l'instant"; // sécurité

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 10) return "à l'instant";
  if (minutes < 1) return `il y a ${seconds} sec`;
  if (minutes < 60) return `il y a ${minutes} min`;
  if (hours < 24) return `il y a ${hours} h`;
  if (days === 1) return "Hier";
  if (days < 7) return `il y a ${days} jours`;

  return created.toLocaleDateString(); // fallback propre
}

  // 🗑️ supprimer message
  deleteMessage(id: string) {

    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

    this.deletingId = id;

    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => {
        // mise à jour locale sans recharger API
        this.messages = this.messages.filter(m => m._id !== id);
        this.filteredMessages = this.filteredMessages.filter(m => m._id !== id);

        this.deletingId = null;
      },
      error: (err) => {
        console.error(err);
        this.deletingId = null;
      }
    });
  }
}