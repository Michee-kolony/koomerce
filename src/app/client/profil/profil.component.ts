import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  user: any = null;

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  getInitial(): string {
    return this.user?.nom ? this.user.nom.charAt(0).toUpperCase() : '?';
  }
}