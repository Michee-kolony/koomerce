import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confidentialite',
  templateUrl: './confidentialite.component.html',
  styleUrl: './confidentialite.component.css'
})
export class ConfidentialiteComponent implements OnInit {
ngOnInit(): void {
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
