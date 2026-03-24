import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  totalCommandes = 128;
  totalUsers = 54;
  totalArticles = 32;
  commandesToday = 7;

  notifications = [
    {
      nom: 'Jean Mukendi',
      telephone: '+243 810 000 001',
      time: 'Reçu il y a 10 min'
    },
    {
      nom: 'Sarah Tshibola',
      telephone: '+243 820 000 002',
      time: 'À l’instant'
    }
  ];

}
