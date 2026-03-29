import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
