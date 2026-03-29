import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-koomerce',
  templateUrl: './koomerce.component.html',
  styleUrl: './koomerce.component.css'
})
export class KoomerceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
