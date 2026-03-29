import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  url = "https://api-koomerce.shop/contact";

  nom = '';
  email = '';
  telephone = '';
  sujet = 'Question générale';
  message = '';

  loading = false;

  // popup
  showPopup = false;
  popupType: 'success' | 'error' = 'success';
  popupMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendMessage() {

    if (!this.nom || !this.email || !this.message) {
      this.showAlert('error', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.loading = true;

    const data = {
      nom: this.nom,
      email: this.email,
      telephone: this.telephone,
      sujet: this.sujet,
      message: this.message
    };

    this.http.post(this.url, data).subscribe(
      (res) => {
        this.loading = false;
        this.showAlert('success', 'Message envoyé avec succès !');

        // reset form
        this.nom = '';
        this.email = '';
        this.telephone = '';
        this.sujet = 'Question générale';
        this.message = '';
      },
      (err) => {
        this.loading = false;
        this.showAlert('error', 'Erreur lors de l’envoi du message.');
      }
    );
  }

  showAlert(type: 'success' | 'error', message: string) {
    this.popupType = type;
    this.popupMessage = message;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
}