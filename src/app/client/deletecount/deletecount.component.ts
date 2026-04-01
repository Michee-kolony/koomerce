import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deletecount',
  templateUrl: './deletecount.component.html',
  styleUrl: './deletecount.component.css'
})
export class DeletecountComponent implements OnInit {

  user: any = null;
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}