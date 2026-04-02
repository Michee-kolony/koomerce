import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  constructor(private router : Router) { }

  ngOnInit(): void {
    
  }
  logoutAdmin() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
  this.router.navigate(['/auth']);
}
}