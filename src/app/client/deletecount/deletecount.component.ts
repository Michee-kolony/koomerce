import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deletecount',
  templateUrl: './deletecount.component.html',
  styleUrl: './deletecount.component.css'
})
export class DeletecountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
