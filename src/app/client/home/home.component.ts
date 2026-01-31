import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

ngAfterViewInit(): void {
 
  new Splide('#image-carousel', {
  type: 'loop',
  perPage: 3,
  gap: '1.5rem',
  autoplay: true,
  pauseOnHover: true,
  focus:'center',
  pagination: false,
  breakpoints: {
    1024: { perPage: 3},
    640: { perPage: 2}
  }
}).mount();


new Splide('#image-carousel2', {
  type: 'loop',
  perPage: 3,
  gap: '1.5rem',
  autoplay: true,
  pauseOnHover: true,
  pagination: false,
  focus:'center',
  breakpoints: {
    1024: { perPage: 3},
    640: { perPage: 2}
  }
}).mount();


  }
}

